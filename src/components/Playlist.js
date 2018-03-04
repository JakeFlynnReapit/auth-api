import React, { Component } from 'react'

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    return (
			<div className="playlist">
      	<img src={playlist.imageUrl} alt="" />
      	<ul>
					<li className="title">{playlist.name}</li>
        	{
          	playlist.songs.map((song, index) =>
						<li key={index}>{song.name}: {
								Math.round(song.duration / 1000).toString().slice(0)[0] + "m"
							}
						</li>)
        	}
      	</ul>
    	</div>
		)
  }
}

export default Playlist
