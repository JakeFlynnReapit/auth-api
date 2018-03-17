import React, { Component } from 'react'

class Filter extends Component {
  render() {
    return (
			<div className="filter">
      	<input type="text" placeholder="Start typing.." onKeyUp={event => this.props.onTextChange(event.target.value)}/>
    	</div>
		)
  }
}

export default Filter
