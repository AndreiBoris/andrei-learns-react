/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';

import LocalStore from './helpers/LocalStore';
import MoviesApi from './helpers/MoviesApi';
// import Movie from './Movie'

import { Poster } from './Movie';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

class MovieDetail extends Component {
  state = {
    detail: {},
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    try {
      const currentTimestamp = LocalStore.createTimestamp();
      const storedDetailTimestamp = LocalStore.getStoredDetailTimestamp(id);
      let detail = LocalStore.getStoredDetail(id);

      // Check if the stored data is absent or expired, if so, request new data and store it
      if (
        isEmpty(detail) ||
        LocalStore.localDataIsExpired(storedDetailTimestamp, currentTimestamp)
      ) {
        detail = await MoviesApi.getDetail(id);
        LocalStore.storeDetail(detail, id, currentTimestamp);
      }

      this.setState({
        detail,
      });
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
    }
  }

  render() {
    const { detail } = this.state;

    return (
      <MovieWrapper backdrop={`${BACKDROP_PATH}${detail.backdrop_path}`}>
        <MovieInfo>
          <Poster src={`${POSTER_PATH}${detail.poster_path}`} alt={detail.title} />
          <div>
            <h1>{detail.title}</h1>
            <h3>{detail.release_date}</h3>
            <p>{detail.overview}</p>
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
