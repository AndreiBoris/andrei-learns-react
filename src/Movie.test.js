/* eslint-env jest */
// Need to turn off check for unused vars here since React is required in scope to use JSX
import React from 'react'
import ReactDOM from 'react-dom'
import Movie from './Movie'
import { movies } from './movies.json'

it( 'renders without crashing', () => {
  const div = document.createElement( 'div' )
  const [ movie ] = movies
  ReactDOM.render( <Movie movie={movie} />, div )
  ReactDOM.unmountComponentAtNode( div )
} )
