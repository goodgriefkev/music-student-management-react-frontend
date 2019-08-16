import React, { Component } from 'react'

import { BASE_URL } from '../constants.js'

const baseURL = BASE_URL

class CreateAccount extends Component {

  state = {
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    instrument: '',
    location: '',
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
  }

  handleCreateAccount = (event) => {
    event.preventDefault()
    const { password, confirmPassword } = this.state
    if (password !== confirmPassword) {
      alert("Passwords do not match, please try again")
    } else {
      fetch(baseURL + '/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body:
          JSON.stringify({
            user: {
              username: this.state.username,
              password: this.state.password,
              name: this.state.name,
              instrument: this.state.instrument,
              location: this.state.location
            }
          })
      })
        .then( () => this.props.history.push('/'))
    }
  }


  render() {
    return (
      <div>
        <h2>Create Account</h2>
        <form onSubmit={this.handleCreateAccount}>
          <label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={this.handleChange}
              value={this.state.username}
              placeholder="Username"
            />
          </label>
          <br/>
          <label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              placeholder="Password"
            />
          </label>
          <br/>
          <label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={this.handleChange}
              value={this.state.confirmPassword}
              placeholder="Confirm Password"
            />
          </label>
          <br/>
          <label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
              placeholder="Name"
            />
          </label>
          <br/>
          <label>
            Instrument:
            <select
              id="instrument"
              value={this.state.instrument}
              onChange={this.handleChange}
            >
              <option value=""></option>
              <option value="guitar">Guitar</option>
              <option value="bass">Bass</option>
              <option value="drums">Drums</option>
              <option value="piano">Piano</option>
            </select>
          </label>
          <br/>
          <label>
            Location:
            <select
              id="location"
              value={this.state.location}
              onChange={this.handleChange}
            >
              <option value=""></option>
              <option value="altus">Altus</option>
              <option value="quanah">Quanah</option>
              <option value="vernon">Vernon</option>
            </select>
          </label>
          <br/>
          <input type="submit" value="Create Account" />
        </form>
      </div>
    )
  }
}

export default CreateAccount
