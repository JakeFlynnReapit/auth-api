import React, { Component } from 'react';
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
      {
        name: 'House',
        songs: [
          {
            name: 'Darkness',
            duration: 182000
          },
          {
            name: 'Say To Me',
            duration: 256000
          },
          {
            name: 'Gecko (Overdrive)',
            duration: 166000
          },
          {
            name: 'Last All Night (Koala)',
            duration: 245000
          }
        ]
      },
      {
        name: 'Metal',
        songs: [
          {
            name: 'Before I Forget',
            duration: 243000
          },
          {
            name: 'Naysayer',
            duration: 210000
          },
          {
            name: 'Gravity',
            duration: 201000
          },
          {
            name: 'Downfall',
            duration: 245000
          }
        ]
      },
      {
        name: 'Lit',
        songs: [
          {
            name: 'Gucci Gang',
            duration: 131000
          },
          {
            name: 'Look At Me',
            duration: 152000
          },
          {
            name: 'Little Boy',
            duration: 251000
          },
          {
            name: 'The Plan',
            duration: 260000
          }
        ]
      }
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
        <h2>{Math.round(totalDuration * 2.7778E-7) > 1 ? Math.round(totalDuration * 2.7778E-7) + ' hours'
          : Math.round(totalDuration * 2.7778E-7) + ' hour'}</h2>
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
    return (
      <div style={{...defaultStyle, width: "25%", display: "inline-block"}}>
        <img alt=""/>
        <h3>{this.props.playlist.name}</h3>
        <ul>
          {this.props.playlist.songs.map((song, index) =>
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
    var that = this;
    setTimeout(function() {
      that.setState({serverData: dummyData});
    }, 1000);
  }
  render() {

    return (
      <div className="App">
        {this.state.serverData.user ?
        <div>
          <h1 style={{...defaultStyle, fontSize: '54px',}}>
            {this.state.serverData.user.name}s Playlists
          </h1>
          <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
          <HoursCounter playlists={this.state.serverData.user.playlists}/>
          <Filter onTextChange={text => this.setState({filterString: text})}/>
          {this.state.serverData.user.playlists.filter(playlist =>
            playlist.name.toLowerCase().includes(
              this.state.filterString.toLowerCase()
            )
          ).map((playlist, index) =>
            <Playlist playlist={playlist} key={index}/>
          )}
        </div> : <h1 style={{...defaultStyle}}>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
