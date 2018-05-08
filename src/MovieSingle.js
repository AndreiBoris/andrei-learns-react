import React from 'react';
import PropTypes from 'prop-types';

// import Movie from './Movie'

const MovieSingle = ({ match }) => <div>{match.params.id}</div>;

MovieSingle.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MovieSingle;
