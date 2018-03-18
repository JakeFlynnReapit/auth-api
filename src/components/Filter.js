import React, { Component } from 'react'

class Filter extends Component {
	constructor(props) {
		super(props)
		this.setText = this.setText.bind(this)
		this.state = {
			className: 'open'
		}
	}

	setText(e) {
		this.props.onTextChange(e.target.value)
		e.target.value.length
		? this.setState({className: ''})
		: this.setState({className: 'open'})
	}

  render() {
    return (
			<div className={this.state.className + " filter animated fadeIn"}>
      	<input type="text" placeholder="Start typing.." onKeyUp={event => this.setText(event)}/>
				{ this.state.className === 'open' &&
					<div className="close" onClick={this.props.action}>
						close
					</div>
				}
			</div>
		)
  }
}

export default Filter
