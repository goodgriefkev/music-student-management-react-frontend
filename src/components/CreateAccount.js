import React, { Component } from 'react'

class CreateAccount extends Component {

  state = {
    username: '',
    password: '',
    name: '',
    instrument: '',
    location: ''
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
  }

  handleCreateAccount = (event) => {
    event.preventDefault()
    fetch('/users', {
      body:
        JSON.stringify({
          user: {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            instrument: this.state.instrument,
            location: this.state.location
          }
        }),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => console.log(json))
  }

  render() {
    return (
      <div>
        <h2>Create Account</h2>
        <form onSubmit={this.handleCreateAccount}>
          <input
            type='text'
            id='username'
            name='username'
            onChange={this.handleChange}
            value={this.state.username}
            placeholder='Username'
          />
          <br/>
          <input
            type='password'
            id='password'
            name='password'
            onChange={this.handleChange}
            value={this.state.password}
            placeholder='Password'
          />
          <br/>
          <input
            type='text'
            id='name'
            name='name'
            onChange={this.handleChange}
            value={this.state.name}
            placeholder='Name'
          />
          <br/>
          <label>
            Instrument:
            <select
              instrument={this.state.instrument}
              onChange={this.handleChange}
            >
              <option instrument=''></option>
              <option instrument='guitar'>Guitar</option>
              <option instrument='bass'>Bass</option>
              <option instrument='drums'>Drums</option>
              <option instrument='piano'>Piano</option>
            </select>
          </label>
          <br/>
          <label>
            Location:
            <select
              location={this.state.location}
              onChange={this.handleChange}
            >
              <option location=''></option>
              <option location='altus'>Altus</option>
              <option location='quanah'>Quanah</option>
              <option location='vernon'>Vernon</option>
            </select>
          </label>
          <br/>
          <input type='submit' value='Create Account' />
        </form>
      </div>
    )
  }
}

export default CreateAccount
