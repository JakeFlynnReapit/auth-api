import React, { Component } from 'react'

class Navbar extends Component {
	render() {
		return(
			<div className="nav">
				<div className="search" onClick={this.props.action}>
					<i className="fas fa-search"></i>
				</div>
				<a href={this.props.user.spotify_url} target="_blank" rel="noopener noreferrer">
					{this.props.user.img && <img className="user-img" src={this.props.user.img} alt="User" />}
					<span>{this.props.user.name}</span>
				</a>
			</div>
		)
	}
}

export default Navbar
