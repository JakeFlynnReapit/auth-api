import React, {Component} from 'react'

class Landing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      button: {
        className: 'button'
      }
    }
  }
  render() {
    return (<div className="landing">
      <div>
        <h1>Playlister</h1>
        <h3>All of the music you love.</h3>
        <div className={this.state.button.className} onClick={() => {
            this.setState({
              button: {
                className: 'sending button'
              }
            })
            if (window.location.href.includes('localhost')) {
              window.location = 'http://localhost:8888/login'
            } else {
              window.location = 'https://authentication-api-backend.herokuapp.com/login'
            }
          }
}>Log In To Spotify</div>
      </div>
    </div>)
  }
}

export default Landing
