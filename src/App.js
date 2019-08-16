import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import {
        Jumbotron,
        Container } from 'reactstrap'
import Cookies from 'universal-cookie'
import { BASE_URL } from './constants.js'
import CreateAccount from './components/CreateAccount.js'
import LogIn from './components/LogIn.js'
import Student from './components/Student.js'



import './App.css';

const baseURL = BASE_URL
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
    fetch(baseURL + '/assignments')
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

  toggleLoggedIn = () => {
    this.setState({
      loggedIn: !this.state.loggedIn
    })
  }

  handleLogIn = () => {
    console.log("handleLogIn ran")
    this.toggleLoggedIn()
  }

  getCurrentUser = (user_id) => {
    fetch(baseURL + '/users/' + user_id, {
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
    console.log("handleLogOut ran")
    cookies.remove('token', { path: '/' })
    cookies.remove('user', { path: '/' })
    this.setState({loggedIn: false})
  }

  handleDeleteUser = (user_id) => {
    fetch(baseURL + '/users/' + user_id, {
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
        <HashRouter>
          <div>
            <Jumbotron fluid>
              <Container fluid>
                <h1>Stephen Gilbert Musical Instruction</h1>
                <p>Student Portal</p>
              </Container>
            </Jumbotron>

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
                  {...routeProps}
                  baseURL={baseURL}
                />
              )}
            />
          </div>
        </HashRouter>
      </>
    )
  }
}

export default App;
