import React, { Component } from 'react'

class SunObj extends Component {
  state = {
      latlng: '',
      lat: '',
      lng: '',
      ssInfo: '',
      llInfo: '',
  }

  constructor(props) {
    super(props)

    let l = props.match.params.location
    this.fetchUserData(l)
  }

  fetchUserData = (location) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyDVO8AZURL9K42Kxl1p-CfkP6uNRe--vEQ`)
      .then(response => response.json())
      .then(llInfo => this.setState({ llInfo }))
  }

  fetchSunData = (la,lo) => {
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
      let geometry = {
          lat: place.lat,
          lng: place.lng,
      }

      if(this.state.llInfo !== '' || place.lat !== geometry.lat){
        geometry = this.state.llInfo.results[0].geometry.location
        place.lat=geometry.lat
        place.lng=geometry.lng
        this.fetchSunData(place.lat, place.lng)
      }

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