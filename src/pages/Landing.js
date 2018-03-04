import React, { Component } from 'react'

class Landing extends Component {
	render() {
		return (
			<div className="landing">
				<div>
					<h1>Playlister</h1>
					<h3>All of the music you love.</h3>
					<div className="button" onClick={() => {
							if (window.location.href.includes('localhost')) {
								window.location = 'http://localhost:8888/login'
							} else {
								window.location = 'https://authentication-api-backend.herokuapp.com/login'
							}
						}
					}>Log In To Spotify</div>
				</div>
			</div>
		)
	}
}

export default Landing
