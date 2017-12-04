import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import FormField from '../components/FormField'


class Places extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      type: '',
      lat: '',
      long: '',
      placeId: '',
      name: '',
      errors: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.formPayLoad = this.formPayLoad.bind(this)
    this.handleFormClear = this.handleFormClear.bind(this)
  }

  componentDidMount() {
    this.setState({ type: this.props.type, tripId: this.props.tripId })
  }

  handleChange(event){
    this.setState({ address: event })
  }

  handleSubmit(event) {
    event.preventDefault()
    geocodeByAddress(this.state.address)
    .then(results => {
      return getLatLng(results[0])
    }) .then(latLng => {
      let payLoad = this.formPayLoad(latLng)
      this.props.addNewPlace(payLoad, this.props.type)
      this.handleFormClear()
    })
  }

  formPayLoad(coordinates){
    let payLoad
    if (coordinates.lat !== '' && coordinates.lng !== '') {
      payLoad = { address: this.state.address, trip_id:this.props.tripId }
    } else {
      errors = this.state.errors
      errors.push('Must be a valid address')
      this.setState({ errors: errors })
    }
    return payLoad
  }

  handleFormClear() {
    this.setState({address: '', lat: '', long: ''})
  }

  render(){
    let inputProps = {
      value: this.state.address,
      onChange: this.handleChange,
      placeholder: this.props.placeholder
    }
    let errors
    if (this.state.errors) {
      errors = this.state.errors
    }

    return(
      <div className= "places-form-container">
        <div className="destination place">Seach for a location below by address or name</div>
        <form className='places-form' onSubmit={this.handleSubmit}>
          <div className='places-ac'><PlacesAutocomplete inputProps={inputProps} /></div>
          <input className="btn btn-2 btn-2d submit-button place-submit" type='submit' name='Next' />
        </form>
      </div>
  )
  }
}

export default Places