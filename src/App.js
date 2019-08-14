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
    currentUser: undefined,
    loggedIn: false,
    assignments: [],
    userAssignments: []
    }

  componentDidMount() {
    // this.getStudents()
    this.getAssignments()
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

  getAssignments () {
    let assignmentData = {
      singleUserAssignments: []
    }
    fetch('/assignments')
      .then(response => response.json())
      .then(json => {
        json.map((assignment) => {
          if(assignment.user_id == user) {
            assignmentData.singleUserAssignments.push(assignment)
          }
        })
      })
      .then(this.setState({userAssignments: assignmentData.singleUserAssignments}))
      .catch(error => console.error(error))
  }

  handleLogIn = () => {
    console.log("handle log in ran")
    this.setState({loggedIn: true})
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
      this.setState({currentUser: json})
    })
    .then( () => {
      this.handleLogIn()
    })
  }

  checkCurrentUser = () => {
    if (user) {
      this.getCurrentUser(user)
    }
  }

  handleLogOut = () => {
    cookies.remove('token')
    cookies.remove('user')
    this.setState({loggedIn: false})
  }

  handleDeleteUser = (user_id) => {
    fetch('/users/' + user_id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    .then(this.handleLogOut)
    .catch(error => console.log(error))
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
                  handleLogIn={this.handleLogIn}
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
                  loggedIn={this.state.loggedIn}
                  currentUser={this.state.currentUser}
                  getCurrentUser={this.getCurrentUser}
                  userAssignments={this.state.userAssignments}
                  handleLogOut={this.handleLogOut}
                  handleDeleteUser={this.handleDeleteUser}
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
