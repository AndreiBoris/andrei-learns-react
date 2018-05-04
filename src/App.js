import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class Welcome extends Component {
  render() {
    const { text } = this.props
    return <h1 className="App-title">{text}</h1>
  }
}

class App extends Component {
  // Dynamic Import code splitting example
  // async handleClick() {
  //   const { moduleA } = await import("./moduleA");

  //   console.log(moduleA);
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Welcome text="Welcome to Using Props 💃 🙂" />
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
