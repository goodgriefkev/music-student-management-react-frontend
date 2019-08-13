import React, { Component } from 'react'

import Cookies from 'universal-cookie'

const cookies = new Cookies()

let user = cookies.get('user')

class LogIn extends Component {

  state = {
    username: '',
    password: ''
  }

  componentDidMount() {
    if (user) {
      this.props.history.push('/student')
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
  }

  handleSubmitLogIn = (event) => {
    event.preventDefault();
    fetch('/users/login', {
      body:
        JSON.stringify({
          user: {
            username: this.state.username,
            password: this.state.password
          }
        }),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json.user) {
          cookies.set('user', json.user.id, { path: '/' })
          cookies.set('token', json.token, { path: '/' })
          this.props.getCurrentUser(json.user.id)
          this.setState({
            username: '',
            password: '',
            credentialError: false
          })
          this.props.history.push('/student')
        } else {
          this.setState({
            password: '',
            credentialError: true
          })
        }
      }
      )
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <h2>Sign In</h2>
        <form onSubmit={this.handleSubmitLogIn}>
          <label>
            <input
              type='text'
              name='username'
              id='username'
              onChange={this.handleChange}
              value={this.state.username}
              placeholder='Username'
            />
            <input
              type='password'
              name='password'
              id='password'
              onChange={this.handleChange}
              value={this.state.password}
              placeholder='Password'
            />
          </label>
          <input
            type='submit'
            value='Sign In'
          />
        </form>
        {
          this.state.credentialError ?
          <h2>Username or Password Incorrect</h2> :
          null
        }
      </div>
    )
  }
}

export default LogIn
