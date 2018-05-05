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
  submit = () => {
    console.log( this.text.value )
    console.log( this.email.value )
  }

  createRefText = input => {
    this.text = input
  }

  createRefEmail = input => {
    this.email = input
  }

  render() {
    console.log( 'render' )
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Welcome text="Welcome to Using Props 💃 🙂" />
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="text" ref={this.createRefText} />
        <input type="email" ref={this.createRefEmail} />
        <button onClick={this.submit}>Show Value</button>
      </div>
    )
  }
}

export default App
