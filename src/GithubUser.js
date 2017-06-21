import React, { Component } from 'react'
import './GithubUser.css'

class GithubUser extends Component {
  state = {
    user: {
      avatar_url: '',
      login: '',
      followers: '',
      following: '',
      location: '',
      html_url: '',
    }
  }
  constructor(props) {
    super(props)

    console.log('constructor')
    this.fetchUserData(this.props)
  }

  fetchUserData = (props) => {
    console.log('fetchData')
    fetch(`https://api.github.com/users/${props.match.params.username}`)
      .then(response => response.json())
      .then(user => this.setState({ user }))
  }

  componentWillReceiveProps(nextProps) {
    const locationChanged = nextProps.location !== this.props.location
    if (locationChanged) {
      this.fetchUserData(nextProps)
    }
  }

  render() {
    console.log('render')
    const { user } = this.state
    return (
      <div className="github-user">
        <img src={user.avatar_url} alt="user avatar"/>
        <h2>{user.login}</h2>
        <h3>followers: {user.followers}</h3>
        <h3>following: {user.following}</h3>
        <h3>location: {user.location}</h3>
        <a href={user.html_url}>Link to {user.login}'s profile</a>
      </div>
    )
  }
}
export default GithubUser