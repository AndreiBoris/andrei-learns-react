import React from 'react';
import PropTypes from 'prop-types';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';

const Movie = ({ movie }) => (
  <div>
    <h3>{movie.title}</h3>
    <img src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
  </div>
);

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Movie;
