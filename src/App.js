import React, { Component } from 'react'
import logo from './logo.svg'
import tmdb from './tmdb.svg'
import './App.css'
import Movie from './Movie'

/* eslint-disable max-len */
const moviesEndpoint =
  'https://api.themoviedb.org/3/discover/movie?api_key=a2ad2841c78482e5b35edc0dc31ffd51&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1'
/* eslint-enable */

const getDataFromApi = async () =>
  new Promise( ( resolve, reject ) => {
    try {
      setTimeout( () => {
        resolve( [ 'data', 'data', 'data' ] )
      }, 500 )
    } catch ( e ) {
      reject( e )
    }
  } )

const STORAGE_TIMESTAMP = 'movies-timestamp'
const STORAGE_MOVIES = 'movies'

function localDataIsExpired( localDataTimestamp, currentTimestamp, hoursAllowed = 24 ) {
  const HOURS_CONSIDERED_FRESH = hoursAllowed
  const MS_IN_HOUR = 1000 * 3600
  const ALLOWED_TIME_DELTA = HOURS_CONSIDERED_FRESH * MS_IN_HOUR

  const convertedCurrentTimeStamp = parseFloat( currentTimestamp )
  const convertedLocalTimeStamp = parseFloat( localDataTimestamp )

  if ( [ convertedCurrentTimeStamp, convertedLocalTimeStamp ].some( stamp => Number.isNaN( stamp ) ) ) {
    return true
  }

  if ( parseFloat( currentTimestamp ) - parseFloat( localDataTimestamp ) > ALLOWED_TIME_DELTA ) {
    return true
  }
  return false
}

class App extends Component {
  state = {
    movies: [],
  }

  async grabDataFromApi( currentTimestamp ) {
    console.log( 'grabbing data from API' )
    const res = await fetch( moviesEndpoint )
    const movies = await res.json()
    const { results } = movies

    localStorage.setItem( STORAGE_TIMESTAMP, currentTimestamp )
    localStorage.setItem( STORAGE_MOVIES, JSON.stringify( results ) )

    this.setState( {
      movies: results,
    } )
  }

  async componentDidMount() {
    try {
      const currentTimestamp = new Date().getTime()
      const storedMoviesTimestamp = parseFloat( localStorage.getItem( STORAGE_TIMESTAMP ) )
      const storedMovies = localStorage.getItem( STORAGE_MOVIES )
      if (
        [ storedMoviesTimestamp, storedMovies ].some( value => value === null ) ||
        localDataIsExpired( storedMoviesTimestamp, currentTimestamp )
      ) {
        this.grabDataFromApi( currentTimestamp )
        return
      }

      const storedMoviesArray = JSON.parse( storedMovies )
      if ( !Array.isArray( storedMoviesArray ) ) {
        this.grabDataFromApi( currentTimestamp )
        return
      }

      console.log( 'Local data looks good. Loading it...' )
      this.setState( {
        movies: storedMoviesArray,
      } )
    } catch ( e ) {
      console.log( e )
    }
  }

  render() {
    const { movies } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        {movies.map( movie => <Movie key={movie.id} movie={movie} /> )}
        <footer>
          <img src={tmdb} alt="The Movie Database Logo" className="Footer-logo" />
          This product uses the TMDb API but is not endorsed or certified by TMDb.
        </footer>
      </div>
    )
  }
}

export default App
