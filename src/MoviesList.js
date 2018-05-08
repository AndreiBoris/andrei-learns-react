/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
import Movie from './Movie';

import LocalStore from './helpers/LocalStore';
import MoviesApi from './helpers/MoviesApi';

class MoviesList extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    try {
      const currentTimestamp = LocalStore.createTimestamp();
      const storedMoviesTimestamp = LocalStore.getStoredMoviesTimestamp();
      let movies = LocalStore.getStoredMovies();

      // Check if the stored data is absent or expired, if so, request new data and store it
      if (
        [storedMoviesTimestamp, movies].some(value => value === null) ||
        LocalStore.localDataIsExpired(storedMoviesTimestamp, currentTimestamp)
      ) {
        movies = await MoviesApi.getList();
        LocalStore.storeMovies(movies, currentTimestamp);
      }

      this.setState({
        movies,
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
