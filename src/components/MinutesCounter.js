import React, {Component} from 'react'

class MinutesCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
        return songs.concat(eachPlaylist.songs)
      }, []),
      totalDuration = allSongs.reduce((sum, eachSong) => {
        return sum + eachSong.duration
      }, 0)
    return (<div className="minute-counter">
      <h2>or around
        <span>{Math.round(totalDuration / 1000 / 60)}</span>
        minutes</h2>
    </div>)
  }
}

export default MinutesCounter
