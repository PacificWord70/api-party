import React, { Component } from 'react'

class SunObj extends Component {
  state = {
      latlng: '',
      lat: '',
      lng: '',
      ssInfo: '',
  }

  constructor(latlng) {
    super(latlng)

    const ll = latlng.match.params.latlng
    const la = ll.substring(0,ll.indexOf('-'))
    const lo = ll.substring(ll.indexOf('-')+1,ll.length)
    this.state.lat = la
    this.state.lng = lo
    this.state.latlng = la+' '+lo
    this.fetchUserData(la,lo)
  }

  fetchUserData = (la,lo) => {
    fetch(`https://api.sunrise-sunset.org/json?lat=${la}&lng=${lo}&date=today`)
      .then(response => response.json())
      .then(ssInfo => this.setState({ ssInfo }))
  }

  componentWillReceiveProps(nextProps) {
    const locationChanged = nextProps.location !== this.props.location
    if (locationChanged) {
      this.fetchUserData(nextProps)
    }
  }

  render() {
      const place = this.state
      let results = ''
      if(this.state.ssInfo !== ''){
        results = this.state.ssInfo.results
      }
      
    return (
      <div className="sun-obj">
        <h3>Latitude: {place.lat}</h3>
        <h3>Longitude: {place.lng}</h3>
        <h3>Sunrise: {results.sunrise}</h3>
        <h3>Sunset: {results.sunset}</h3>
        <h3>Day Length: {results.day_length}</h3>
        <a href={"https://www.google.com/maps/place/"+place.latlng}>Link to this location!</a>
      </div>
    )
  }
}
export default SunObj