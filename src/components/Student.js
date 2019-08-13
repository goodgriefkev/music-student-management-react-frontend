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
          </>
          :
          <>
            <h2>
              No user logged in.
            </h2>
          </>
        }

      </div>
    )
  }
}

export default Student
