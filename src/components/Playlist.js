import React, { Component } from 'react'

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    return (
			<a className="playlist" href={playlist.url} target="_blank" rel="noopener noreferrer">
				<div>
	      	<img src={playlist.imageUrl} alt="Playlist" />
					<h5>{playlist.name}</h5>
	      	<ul>
	        	{
	        	playlist.songs.map((song, index) =>
							<li key={index}>{song.name}</li>
						)
	        	}
	      	</ul>
	    	</div>
			</a>
		)
  }
}

export default Playlist
