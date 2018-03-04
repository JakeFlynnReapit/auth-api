import React, { Component } from 'react'
import queryString from 'query-string'
import './css/main.css'
import PlaylistCounter from './components/PlaylistCounter'
import MinutesCounter from './components/MinutesCounter'
import Filter from './components/Filter'
import Playlist from './components/Playlist'
import Landing from './pages/Landing'

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ''
    }
  }

  componentDidMount() {
    let parsedTokens = queryString.parse(window.location.search)
    let accessToken = parsedTokens.access_token

    if (!accessToken) {
      return
    }

    fetch('https://api.spotify.com/v1/me/', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }).then((response) => response.json()).then(data => this.setState({
      user: {
        name: data.display_name
      }
    }))

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
		.then((response) => response.json())
		.then(playlistData => {
			let playlists = playlistData.items
			let trackDataPromises = playlistData.items.map(playlist => {
				let responsePromise = fetch(playlist.tracks.href, {
		      headers: {
		        'Authorization': 'Bearer ' + accessToken
		      }
				})
				let trackDataPromise = responsePromise
				.then(response => response.json())
				return trackDataPromise
			})
			let allTrackDataPromises =
				Promise.all(trackDataPromises)
			let playlistPromise = allTrackDataPromises
			.then(trackData => {
				trackData.forEach((trackData, i) => {
					playlists[i].trackData = trackData.items
						.map(item => item.track)
						.map(trackData => ({
							name: trackData.name,
							duration: trackData.duration_ms
						}))
				})
				return playlists
			})
			return playlistPromise
		})
		.then(playlists => this.setState({
      playlists: playlists.map(item => {
        return {
					name: item.name,
					imageUrl: item.images[0].url,
					songs: item.trackData.slice(0,5)
				}
      })
    }))
  }

  render() {
    let playlistsToRender = this.state.user && this.state.playlists
      ? this.state.playlists.filter(playlist => {
				let matchesPlaylist = playlist.name.toLowerCase().includes(
					this.state.filterString.toLowerCase())
				let matchesSong = playlist.songs.find(song => song.name.toLowerCase()
				.includes(this.state.filterString.toLowerCase()))
				return matchesPlaylist || matchesSong
			})
      : []
    return (
      <div className="app">
      {
        this.state.user
          ? <div className="user-wrapper">
              <h1>
                Hey, {this.state.user.name}!
              </h1>
              <PlaylistCounter playlists={playlistsToRender}/>
              <MinutesCounter playlists={playlistsToRender}/>
              <Filter onTextChange={text => this.setState({filterString: text})}/>
							<div className="playlists-wrapper">
								{
									playlistsToRender.map((playlist, index) => <Playlist playlist={playlist} key={index}/>)
								}
							</div>
            </div>
          : <Landing />
        }
      </div>
    )
  }
}

export default App;
