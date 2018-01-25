import React, { Component } from 'react';
import queryString from 'query-string';
import './App.css';

let defaultStyle = {
  color: '#fff',
}
let dummyData = {
  user: {
    name: 'Jake',
    playlists: [
      {
        name: 'Favourites',
        songs: [
          {
            name: 'I Fall Apart',
            duration: 208000
          },
          {
            name: 'Rapper',
            duration: 143000
          },
          {
            name: 'I\'m Not Racist',
            duration: 415000
          },
          {
            name: 'Boss',
            duration: 106000
          }
        ]
      },
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: "40%", display: "inline-block"}}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    },[]);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0);
    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{Math.round(totalDuration / 1000 / 60) + ' minutes'}</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img alt=""/>
        <input type="text" onKeyUp={event =>
            this.props.onTextChange(event.target.value)}/>
        Filter
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    return (
      <div style={{...defaultStyle, width: "25%", display: "inline-block"}}>
        <img alt=""/>
        <img src={playlist.imageUrl} alt="" style={{width: '160px'}}/>
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map((song, index) =>
            <li key={index}>{song.name} ({Math.round(song.duration / 1000)})</li>
          )}
        </ul>
      </div>
    );
  }
}

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

    fetch('https://api.spotify.com/v1/me/', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }).then((response) => response.json())
    .then(data => this.setState({
      user: {
        name: data.display_name
      }
    }))

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }).then((response) => response.json())
    .then(data => this.setState({
      playlists: data.items.map(item => {
        console.log(data.items)
        return {
          name: item.name,
          imageUrl: item.images[0].url,
          songs: [],
        }
      })
    }))
  }
  render() {
    let playlistsToRender =
    this.state.user &&
    this.state.playlists
      ? this.state.playlists.filter(playlist =>
        playlist.name.toLowerCase().includes(
          this.state.filterString.toLowerCase()
        ))
      : []
    return (
      <div className="App">
        {this.state.user ?
        <div>
          <h1 style={{...defaultStyle, fontSize: '55px',}}>
            {this.state.user.name}s Playlists
          </h1>
          <PlaylistCounter playlists={playlistsToRender}/>
          <HoursCounter playlists={playlistsToRender}/>
          <Filter onTextChange={text => this.setState({filterString: text})}/>
          {playlistsToRender.map((playlist, index) =>
            <Playlist playlist={playlist} key={index}/>
          )}
        </div> : <button
                  onClick={() => window.location = 'http://localhost:8888/login'}
                  style={{padding: '20px',fontSize: '50px',marginTop: '20px'}}
                  >Sign In</button>
        }
      </div>
    );
  }
}

export default App;
