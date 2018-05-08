/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
import Movie from './Movie';

/* eslint-disable max-len */
const moviesEndpoint =
  'https://api.themoviedb.org/3/discover/movie?api_key=a2ad2841c78482e5b35edc0dc31ffd51&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
/* eslint-enable */

const STORAGE_TIMESTAMP = 'movies-timestamp';
const STORAGE_MOVIES = 'movies';

const localStorage = window.localStorage || {};

// Compare the localDataTimestamp with the currentTimestamp and determine whether
// localDataTimestamp is expired based on hoursAllowed
function localDataIsExpired(localDataTimestamp, currentTimestamp, hoursAllowed = 1) {
  const HOURS_CONSIDERED_FRESH = hoursAllowed;
  const MS_IN_HOUR = 1000 * 3600;
  const ALLOWED_TIME_DELTA = HOURS_CONSIDERED_FRESH * MS_IN_HOUR;

  const convertedCurrentTimeStamp = parseFloat(currentTimestamp);
  const convertedLocalTimeStamp = parseFloat(localDataTimestamp);

  if ([convertedCurrentTimeStamp, convertedLocalTimeStamp].some(stamp => Number.isNaN(stamp))) {
    return true;
  }

  if (parseFloat(currentTimestamp) - parseFloat(localDataTimestamp) > ALLOWED_TIME_DELTA) {
    return true;
  }
  return false;
}

class MoviesList extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    try {
      const currentTimestamp = new Date().getTime();
      const storedMoviesTimestamp = parseFloat(localStorage.getItem(STORAGE_TIMESTAMP));
      const storedMovies = localStorage.getItem(STORAGE_MOVIES);
      if (
        [storedMoviesTimestamp, storedMovies].some(value => value === null) ||
        localDataIsExpired(storedMoviesTimestamp, currentTimestamp)
      ) {
        this.grabMoviesFromApi(currentTimestamp);
        return;
      }

      const storedMoviesArray = JSON.parse(storedMovies);
      if (!Array.isArray(storedMoviesArray)) {
        this.grabMoviesFromApi(currentTimestamp);
        return;
      }

      console.log('Local data looks good. Loading it...'); // eslint-disable-line no-console
      this.setState({
        movies: storedMoviesArray,
      });
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
    }
  }

  // Grab movies from API and apply currentTimestamp to storage
  async grabMoviesFromApi(currentTimestamp) {
    console.log('grabbing data from API'); // eslint-disable-line no-console
    try {
      const res = await fetch(moviesEndpoint);
      const movies = await res.json();
      const { results } = movies;

      localStorage.setItem(STORAGE_TIMESTAMP, currentTimestamp);
      localStorage.setItem(STORAGE_MOVIES, JSON.stringify(results));

      this.setState({
        movies: results,
      });
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
    }
  }
  render() {
    const { movies } = this.state;

    return <div>{movies.map(movie => <Movie key={movie.id} movie={movie} />)}</div>;
  }
}

export default MoviesList;
