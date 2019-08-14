import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
let user = cookies.get('user')

class Student extends Component {

  state = {
    loggedIn: false,
  }

  handleCompletedChange = (event) => {
    const assignment_id = event.target.id
    console.log(event.target.checked)
    fetch('/assignments/' + assignment_id, {
      body: JSON.stringify({
        completed:
            event.target.checked ?
            true :
            false
      }),
      method: 'PATCH',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(this.forceUpdate())
    .catch(error => console.log(error))
  }

  logOut = () => {
    this.props.handleLogOut()
    return <Redirect to='/' />
  }

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
              </tbody>
            </table>
            <p>Assignments: </p>
            {this.props.userAssignments.map((assignment, i) => (
              <table key={i}>
                <tbody>
                  <tr>
                    <td>
                      <div>
                        <h4>Date: {assignment.date}</h4>
                        <h4>Assignment: {assignment.content}</h4>
                        <h4>Completed:
                          <form>
                            <input
                              type="checkbox"
                              name="completed"
                              id={assignment.id}

                              checked={
                                assignment.completed
                              }
                              onChange={this.handleCompletedChange}
                              />
                          </form>
                        {assignment.completed}</h4>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
            <br/>
            <button onClick={ this.logOut }>
              Sign Out
            </button>
            <br/>
            <br/>
            <button onClick={ () => this.props.handleDeleteUser(user) }>
              Delete Account
            </button>
            <br />
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
