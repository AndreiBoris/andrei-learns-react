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
  };

  async componentDidMount() {
    try {
      const currentTimestamp = LocalStore.createTimestamp();
      const storedMoviesTimestamp = LocalStore.getStoredMoviesTimestamp();
      let movies = LocalStore.getStoredMovies();

      // Check if the stored data is absent or expired, if so, request new data and store it
      if (
        isEmpty(movies) ||
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

    return <MovieGrid>{movies.map(movie => <Movie key={movie.id} movie={movie} />)}</MovieGrid>;
  }
}

export default MoviesList;
