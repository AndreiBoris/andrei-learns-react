/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import LocalStore from './helpers/LocalStore';
import MoviesApi from './helpers/MoviesApi';
// import Movie from './Movie'

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
      <div>
        <img src={`${BACKDROP_PATH}${detail.backdrop_path}`} alt={detail.title} />
        <img src={`${POSTER_PATH}${detail.poster_path}`} alt={detail.title} />
        <h1>{detail.title}</h1>
        <h3>{detail.release_date}</h3>
        <p>{detail.overview}</p>
      </div>
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
