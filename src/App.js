import React, { Component } from 'react';
import LogIn from './components/LogIn.js'
import Student from './components/Student.js'
import './App.css';

import Cookies from 'universal-cookie'

let baseURL = 'http://localhost:3000'

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
      <div>
        <h1>Stephen Gilbert Musical Instruction</h1>
        <LogIn
          baseURL={baseURL}
          getCurrentUser={this.getCurrentUser}
          currentUser={this.state.currentUser}
        />
        <Student
          currentUser={this.state.currentUser}
          handleLogOut={this.handleLogOut}
        />
      </div>
    )
  }
}

export default App;
