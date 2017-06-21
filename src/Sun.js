import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import SunObj from './SunObj'

class Sun extends Component {
  state = {
    location: '',
  }

  handleChange = (ev) => {
    const location = ev.currentTarget.value
    this.setState({ location })
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    this.props.history.push(`/sun/${this.state.location}`)
  }

  render() {
    return (
      <div className="sun">
        <p>(Time is in UTC and does not account for day light savings)</p>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input 
              type="text"
              placeholder="Input the location"
              value={this.state.location}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button type="submit">Look up sunrise / sunset time</button>
          </div>
        </form>

        <Route exact path='/sun' render={() => <h3>Please enter a location to search</h3>} />
        <Route path='/sun/:location' component={SunObj} />
      </div>
    )
  }
}

export default Sun