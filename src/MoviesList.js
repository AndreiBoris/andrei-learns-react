/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';

import Movie from './Movie';
import LocalStore from './helpers/LocalStore';
import MoviesApi from './helpers/MoviesApi';

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-row-gap: 1rem;
`;

class MoviesList extends Component {
  state = {
    movies: [],
    error: '',
  };

  async componentDidMount() {
    const currentTimestamp = LocalStore.createTimestamp();
    const storedMoviesTimestamp = LocalStore.getStoredMoviesTimestamp();
    let movies = LocalStore.getStoredMovies();
    // Check if the stored data is absent or expired, if so, request new data and store it
    if (isEmpty(movies) || LocalStore.localDataIsExpired(storedMoviesTimestamp, currentTimestamp)) {
      try {
        movies = await MoviesApi.getList();
      } catch (e) {
        if (e instanceof MoviesApi.UnauthorizedError) {
          // TODO: Should report that we are not authorized to get the movie data.
          this.setState({
            error: e.message,
          });
        } else {
          // TODO: Should report on this error by grabbing the stack related to e and sending it to a service
          this.setState({
            error: 'An error occured when trying to contact The Movie Database.',
          });
        }
        return;
      }
      LocalStore.storeMovies(movies, currentTimestamp);
    }

    this.setState({
      movies,
      error: '',
    });
  }

  render() {
    const { movies, error } = this.state;

    if (!isEmpty(error)) {
      return <p className="movie-api-error">⚠ {error} ⚠</p>;
    }

    if (!movies) {
      return null;
    }

    return <MovieGrid>{movies.map(movie => <Movie key={movie.id} movie={movie} />)}</MovieGrid>;
  }
}

export default MoviesList;
