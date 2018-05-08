/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
import Movie from './Movie';

import LocalStore from './helpers/LocalStore';

/* eslint-disable max-len */
const moviesEndpoint =
  'https://api.themoviedb.org/3/discover/movie?api_key=a2ad2841c78482e5b35edc0dc31ffd51&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
/* eslint-enable */

class MoviesList extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    try {
      const currentTimestamp = LocalStore.createTimestamp();
      const storedMoviesTimestamp = LocalStore.getStoredMoviesTimestamp();
      const movies = LocalStore.getStoredMovies();
      if (
        [storedMoviesTimestamp, movies].some(value => value === null) ||
        LocalStore.localDataIsExpired(storedMoviesTimestamp, currentTimestamp)
      ) {
        this.grabMoviesFromApi(currentTimestamp);
        return;
      }

      console.log('Local data looks good. Loading it...'); // eslint-disable-line no-console
      this.setState({
        movies,
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

      LocalStore.storeMovies(results, currentTimestamp);

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
