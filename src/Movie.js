import React, { Component } from 'react'

export default class Movie extends Component {
  render() {
    const { movie } = this.props
    return (
      <div>
        <h3>{movie.title}</h3>
        <p>{movie.desc}</p>
      </div>
    )
  }
}
