import React, { Component } from 'react'

class SunObj extends Component {
  state = {

      location: '',
      latlng: '',
      lat: '',
      lng: '',
      ssInfo: '',
      llInfo: '',
  }

  constructor(props) {
    super(props)

    console.log('constructor')
    let l = props.match.params.location
    this.state.location = l
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
        place.latlng = place.lat+' '+place.lng
        this.fetchSunData(place.lat, place.lng)
      }
//13
      let results = ''
      if(this.state.ssInfo !== ''){
        results = this.state.ssInfo.results

      let newRiseH = ''
      let newRiseM = ''
      let newSetH = ''
      let newSetM = ''

      var today = new Date()
      console.log('date')
       let h = parseInt(parseInt(place.lng)/14)
      console.log('/14')
       h=parseInt(h)
      console.log('parse')
       while(h>12)
       {
           h-12
           console.log('h>12')
        }
       while(h<0)
       {
           h+12
           console.log('h<12')
        }
       //console.log(h)
       let m = parseInt(h%60)
      
      newRiseH=results.sunrise.substring(0,results.sunrise.indexOf(':'))
      newRiseM=results.sunrise.substring(results.sunrise.indexOf(':')+1,results.sunrise.indexOf(':')+3)
      newSetH=results.sunset.substring(0,results.sunset.indexOf(':'))
      newSetM=results.sunset.substring(results.sunset.indexOf(':')+1,results.sunset.indexOf(':')+3)
      
      newRiseH=parseInt(newRiseH)-h+1
      newRiseM=parseInt(newRiseM)-m
      newSetH=parseInt(newSetH)-h+1
      newSetM=parseInt(newSetM)-m

      results.sunrise = newRiseH+':'+newRiseM+' AM'
      results.sunset = newSetH+':'+newSetM+' PM'
      }


    return (
      <div className="sun-obj">
        <h3>Location: {place.location}</h3>
        <h3>Latitude: {place.lat}</h3>
        <h3>Longitude: {place.lng}</h3>
        <h3>Sunrise (local time): {results.sunrise}</h3>
        <h3>Sunset (local time): {results.sunset}</h3>
        <h3>Day Length: {results.day_length}</h3>
        <a className="maps-logo" href={"https://www.google.com/maps/place/"+place.location}>
            <img src={require('./googleMapsLogo.png')} />
        </a>
        <p>(Click ^above^ to see in maps)</p>
      </div>
    )
  }
}
export default SunObj