import React, { Component } from 'react'
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap'

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

          this.props.handleLogIn()
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
        <h4 textalign='center'>Sign In</h4>
        <Form onSubmit={this.handleSubmitLogIn}>
          <FormGroup>
            <Label for="username"></Label>
              <Input
                type='text'
                name='username'
                id='username'
                onChange={this.handleChange}
                value={this.state.username}
                placeholder='Username'
              />
            <Label for="password"></Label>
              <Input
                type='password'
                name='password'
                id='password'
                onChange={this.handleChange}
                value={this.state.password}
                placeholder='Password'
              />

            <Input
              type='submit'
              value='Sign In'
            />
          </FormGroup>
        </Form>
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
