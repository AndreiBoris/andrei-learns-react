import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class Welcome extends Component {
  render() {
    const { text, toggle } = this.props
    if (toggle) {
      return <h1 className="App-title">{text}</h1>
    }
    return ''
  }
}

class App extends Component {
  // Dynamic Import code splitting example
  // async handleClick() {
  //   const { moduleA } = await import("./moduleA");

  //   console.log(moduleA);
  // }

  state = {
    toggle: true,
  }

  toggle = () => {
    this.setState({
      toggle: !this.state.toggle,
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Welcome text="Welcome to Using Props 💃 🙂" toggle={this.state.toggle} />
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.state.toggle && <p>This should show and hide.</p>}
        <button onClick={this.toggle}>Show / Hide</button>
      </div>
    )
  }
}

export default App
