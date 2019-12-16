import React, { Component } from 'react';
import './App.css';
import GitRepo from './components/GitRepo'


class App extends Component {
  render() {
    console.log("Host URL"+process.env.PUBLIC_URL);
    return (

        <div className="App">
        <div className="banner">
          <h1>JavaScript Coding Exercise</h1>
          <h2>By Elena Riashchentceva</h2>
        </div>
          <GitRepo />
      </div>
    );
  }
}

export default App;
