import React from 'react';
import PropTypes from 'prop-types';

// import Movie from './Movie'

const MovieDetail = ({ match }) => <div>{match.params.id}</div>;

MovieDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MovieDetail;
