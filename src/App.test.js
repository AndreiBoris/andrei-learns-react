/* eslint-env jest */
// Need to turn off check for unused vars here since React is required in scope to use JSX
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

it( 'renders without crashing', () => {
  const div = document.createElement( 'div' )
  ReactDOM.render( <App />, div )
  ReactDOM.unmountComponentAtNode( div )
} )

describe( 'Jest Behaviour', () => {
  it( 'performs math reasonably', () => {
    expect( 1 + 1 ).toEqual( 2 )
  } )

  it( 'understands booleans', () => {
    expect( null ).toBeFalsy()
    expect( [] ).toBeTruthy()
  } )
} )

describe( 'Performs Promises', () => {
  it( 'handles async', async () => {
    const lalala = await new Promise( ( resolve, reject ) => {
      try {
        setTimeout( () => {
          resolve( 'lalala' )
        }, 500 )
      } catch ( error ) {
        reject( new Error( error ) )
      }
    } )
    expect( lalala ).toEqual( 'lalala' )
  } )
} )
