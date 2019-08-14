import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap'
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
      <Container>
        {this.props.currentUser ?
          <>
            <div style={{ textAlign: 'right' }}>
              <h4>
                user {this.props.currentUser.username}
              </h4>

              <button onClick={ this.logOut }>
                Sign Out
              </button>
            </div>
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
            <b>Assignments: </b>
            <br/>
            <br/>
            {this.props.userAssignments.map((assignment, i) => (
              <div key={i}>
                <h5>Date: {assignment.date}</h5>
                <h5>Assignment: {assignment.content}</h5>
                <h5>Completed:
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
                {assignment.completed}</h5>
              </div>
            ))}
            <br/>
            <br/>
            <br/>
            <button onClick={ () => this.props.handleDeleteUser(user) }>
              Delete Account
            </button>
            <br/>
            <br/>
          </>
          :
          <>
            <h3>
              <Link to='/'>Click here to Sign In</Link>
            </h3>
          </>
        }
        </Container>
      </div>
    )
  }
}

export default Student
