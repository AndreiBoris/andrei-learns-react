import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';

const Movie = ({ movie }) => (
  <div>
    {/* eslint-disable jsx-a11y/anchor-is-valid */}
    <Link to={`/${movie.id}`}>
      {/* eslint-enable */}
      <img src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
    </Link>
    <h3>{movie.title}</h3>
  </div>
);

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Movie;
