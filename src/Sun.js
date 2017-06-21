import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import SunObj from './SunObj'

class Sun extends Component {
  state = {
    lat: '',
    lng: '',
  }

  handleChangeLat = (ev) => {
    const lat = ev.currentTarget.value
    this.setState({ lat })
  }

  handleChangeLng = (ev) => {
    const lng = ev.currentTarget.value
    this.setState({ lng })
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    this.props.history.push(`/sun/${this.state.lat}-${this.state.lng}`)
  }

  render() {
    return (
      <div className="sun">
        <p>(Time is in UTC and does not account for day light savings)</p>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input 
              type="text"
              placeholder="Input the latitude"
              value={this.state.lat}
              onChange={this.handleChangeLat}
            />
            <input 
              type="text"
              placeholder="Input the longitude"
              value={this.state.lng}
              onChange={this.handleChangeLng}
            />
          </div>
          <div>
            <button type="submit">Look up sunrise / sunset time</button>
          </div>
        </form>

        <Route exact path='/sun' render={() => <h3>Please enter a location to search</h3>} />
        <Route path='/sun/:latlng' component={SunObj} />
      </div>
    )
  }
}

export default Sun