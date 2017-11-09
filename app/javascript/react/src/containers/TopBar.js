import React, { Component } from 'react'

class TopBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: {}
    }
  }

  componentWillMount() {
    fetch('/api/v1/users/user_profile.json', {
      credentials: "same-origin",
      headers: {"Content-Type": "application/json"}
    }) .then(response => response.json())
    .then(body => {
      this.setState({ profile: body.user_profile })
    })
  }

  render() {
    return(
      <div className='top-bar'>
        <div className='column small-3 top-bar-left'>FIND MY WAY</div>
        <div className='column small-3 top-bar-left'>{this.props.script}</div>
        <div><img className=" profile_picture" src={this.state.profile.picture} /></div>
        <div className='column small-3 end name'>Welcome {this.state.profile.first_name}!</div>
      </div>
    )
  }
}

export default TopBar