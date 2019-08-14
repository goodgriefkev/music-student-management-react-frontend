import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
let user = cookies.get('user')

class Student extends Component {

  state = {
    loggedIn: false,
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    this.setState({
      loggedIn: this.props.loggedIn
    })
    console.log(this.props.loggedIn)
    console.log(this.state)
  }

  handleCompletedChange = (event) => {
    event.preventDefault()
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
            {this.props.userAssignments.map((assignment) => (
              <table>
                <tbody>
                  <tr>
                    <td>
                      <ul>
                        <li>{assignment.date}</li>
                        <li>{assignment.content}</li>
                        <li>Completed:
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
                        {assignment.completed}</li>
                      </ul>
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
            <button onClick={ this.getData }>
              magic button
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
