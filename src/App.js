import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Cookies from 'universal-cookie'

import CreateAccount from './components/CreateAccount.js'
import LogIn from './components/LogIn.js'
import Student from './components/Student.js'

import './App.css';

const baseURL = 'http://localhost:3000'
const cookies = new Cookies()
let token = cookies.get('token')
let user = cookies.get('user')

class App extends Component {

  state = {
    currentUser: undefined
    }

  componentDidMount() {
    // this.getStudents()
    // this.getAssignments()
    // this.getCurrentUser()
    this.checkCurrentUser()
  }

  // getStudents () {
  //   fetch('/users')
  //     .then(response => response.json())
  //     .then(json => console.log(json))
  //     .catch(error => console.error(error))
  // }
  //
  // getAssignments () {
  //   fetch('/assignments')
  //     .then(response => response.json())
  //     .then(json => console.log(json))
  //     .catch(error => console.error(error))
  // }

  checkCurrentUser = () => {
    if (user) {
      this.getCurrentUser(user)
    }
  }

  getCurrentUser = (user_id) => {
    fetch('/users/' + user_id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    .then(response => response.json())
    .then(json => {
      this.setState({currentUser: json})})
  }

  handleLogOut = () => {
    cookies.remove('token')
    cookies.remove('user')
  }

  render() {
    return (
      <>
        <Router>
          <div>
            <h1>Stephen Gilbert Musical Instruction</h1>
            <h2>Student Portal</h2>

            <Route exact
              path='/'
              render={(routeProps) => (
                <LogIn
                  {...routeProps}
                  baseURL={baseURL}
                  getCurrentUser={this.getCurrentUser}
                  currentUser={this.state.currentUser}
                />
              )}
            />

            <Route
              path='/student'
              render={(routeProps) => (
                <Student
                  {...routeProps}
                  currentUser={this.state.currentUser}
                  handleLogOut={this.handleLogOut}
                />
              )}
            />

            <Route
              path='/createaccount'
              render={(routeProps) => (
                <CreateAccount
                  baseURL={baseURL}
                />
              )}
            />

          </div>
        </Router>
      </>
    )
  }
}

export default App;
