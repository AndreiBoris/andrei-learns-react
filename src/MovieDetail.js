/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';

import LocalStore from './helpers/LocalStore';
import MoviesApi from './helpers/MoviesApi';
// import Movie from './Movie'

import { Poster } from './Movie';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

class MovieDetail extends Component {
  state = {
    movie: {},
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const currentTimestamp = LocalStore.createTimestamp();
    const storedDetailTimestamp = LocalStore.getStoredDetailTimestamp(id);
    let movie = LocalStore.getStoredDetail(id);

    // Check if the stored data is absent or expired, if so, request new data and store it
    if (isEmpty(movie) || LocalStore.localDataIsExpired(storedDetailTimestamp, currentTimestamp)) {
      movie = await MoviesApi.getDetail(id);
      LocalStore.storeDetail(movie, id, currentTimestamp);
    }

    this.setState({
      movie,
    });
  }

  render() {
    const { movie } = this.state;

    if (isEmpty(movie)) {
      return null;
    }

    return (
      <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
        <MovieInfo>
          <Overdrive id={`${movie.id}`}>
            <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
          </Overdrive>
          <div>
            <h1>{movie.title}</h1>
            <h3>{movie.release_date}</h3>
            <p>{movie.overview}</p>
          </div>
        </MovieInfo>
      </MovieWrapper>
    );
  }
}

MovieDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MovieDetail;

const MovieWrapper = styled.div`
  position: relative;
  padding-top: 50vh;
  background: url(${props => props.backdrop}) no-repeat;
  background-size: cover;
`;

const MovieInfo = styled.div`
  background: white;
  text-align: left;
  padding: 2rem 10%;
  display: flex;
  > div {
    margin-left: 20px;
  }
  > img {
    position: relative;
    top: -5rem;
  }
`;
