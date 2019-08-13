import React, { Component } from 'react'

class Student extends Component {
  render() {
    return(
      <div>
        {this.props.currentUser ?
          <>
            <h2>
              You are logged in as {this.props.currentUser.username}
            </h2>
            <button onClick={this.props.handleLogOut}>
              Sign Out
            </button>
          </>
          :
          <>
            {this.props.history.push('/')}
          </>
        }

      </div>
    )
  }
}

export default Student
