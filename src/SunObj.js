import React, { Component } from 'react'

class SunObj extends Component {
  state = {
      disclaimer: '(Time is in UTC and does not account for day light savings)',
      offSet: false,
      location: '',
      latlng: '',
      lat: '',
      lng: '',
      ssInfo: '',
      llInfo: '',
      tInfo: '',
  }

  constructor(props) {
    super(props)

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

  fetchTimeData = (la,lo) => {
    fetch(`https://api.worldweatheronline.com/premium/v1/tz.ashx?key=c4311e21bbb04fbb8dc100839172106&q=${la},${lo}&format=json`)
        .then(response => response.json())
        .then(tInfo => this.setState({ tInfo }))
  }

  componentWillReceiveProps(nextProps) {
    const locationChanged = nextProps.location !== this.props.location
    if (locationChanged) {
      this.fetchUserData(nextProps)
    }
  }

  didOffSet = () => {
    const offSet = parseInt(this.state.tInfo.data.time_zone[0].utcOffset)

      let newRiseH, newRiseM, newSetH, newSetM = ''

      const r = this.state.ssInfo.results


      newRiseH=r.sunrise.substring(0,r.sunrise.indexOf(':'))
      newRiseM=r.sunrise.substring(r.sunrise.indexOf(':')+1,r.sunrise.indexOf(':')+3)
      newSetH=r.sunset.substring(0,r.sunset.indexOf(':'))
      newSetM=r.sunset.substring(r.sunset.indexOf(':')+1,r.sunset.indexOf(':')+3)
      

      newRiseH=parseInt(newRiseH)
      newRiseM=parseInt(newRiseM)
      newSetH=parseInt(newSetH)
      newSetM=parseInt(newSetM)

      newRiseH+=offSet
      newSetH+=offSet

      r.sunrise = newRiseH+':'+newRiseM+' AM'
      r.sunset = newSetH+':'+newSetM+' PM'

      this.state.offSet = true
      this.disclaimer = '(Time is in local time but does not account for day light savings)'
      
        this.componentDidUpdate
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
      
      this.fetchTimeData(place.lat,place.lng)
      if(this.state.tInfo !== '' && !this.state.offSet){
        this.didOffSet()
      }
    
      }


    return (
      <div className="sun-obj">
        <p>{this.state.disclaimer}</p>
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