import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
let user = cookies.get('user')

class Student extends Component {
  render() {
    return(
      <div>
        {this.props.currentUser ?
          <>
            <h2>
              You are logged in as {this.props.currentUser.username}
            </h2>
            <table>
              <tbody>
                <tr>
                  <th>Name: </th>
                  <td>{this.props.currentUser.name}</td>
                </tr>
                <tr>
                  <th>Instrument: </th>
                  <td>{this.props.currentUser.instrument}</td>
                </tr>
                <tr>
                  <th>Location: </th>
                  <td>{this.props.currentUser.location}</td>
                </tr>
                <tr>
                  <th>Assignments: </th>
                  <td> </td>
                </tr>
              </tbody>
            </table>
            <br/>
            <button onClick={this.props.handleLogOut}>
              Sign Out
            </button>
            <br/>
            <br/>
            <button onClick={() => this.props.handleDeleteUser(user)}>
              Delete Account
            </button>
          </>
          :
          <>
            <h3>
              <Link to='/'>Click here to Sign In</Link>
            </h3>
          </>
        }

      </div>
    )
  }
}

export default Student
