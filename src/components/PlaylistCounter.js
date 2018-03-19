import React, {Component} from 'react'

class PlaylistCounter extends Component {
  render() {
    return (<div className="playlist-counter">
      <h2>You've got
        <span> {this.props.playlists.length} </span>
         playlists</h2>
    </div>)
  }
}

export default PlaylistCounter
