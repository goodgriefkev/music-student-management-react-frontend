import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.getStudents()
  }

  getStudents () {
    fetch('/users')
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.error(error))
  }

  render() {
    return (
      <div>
        <h1>Stephen Gilbert Musical Instruction</h1>
      </div>
    )
  }
}

export default App;
