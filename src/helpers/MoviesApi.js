import ExtendableError from '../handlers/ExtendableError';

const movieApiDomain = 'https://api.themoviedb.org/3/';
const moviesApiKey = process.env.REACT_APP_MOVIE_API_KEY;
const moviesListRoute = 'discover/movie';
const moviesDetailRoute = 'movie/';

const moviesListEndpoint = () =>
  `${movieApiDomain}${moviesListRoute}?api_key=${moviesApiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

const moviesDetailEndpoint = id =>
  `${movieApiDomain}${moviesDetailRoute}${id}?api_key=${moviesApiKey}&language=en-US`;

class UnauthorizedError extends ExtendableError {
  constructor(message = 'Must provide an API key.') {
    super(message);
  }
}

// Grab movies from API and apply currentTimestamp to storage
const getList = async () => {
  console.log('grabbing movie list from API'); // eslint-disable-line no-console
  const res = await fetch(moviesListEndpoint());
  const movies = await res.json();
  const { results } = movies;

  return results;
};

const getDetail = async (id) => {
  console.log('grabbing movie detail from API'); // eslint-disable-line no-console
  const res = await fetch(moviesDetailEndpoint(id));
  if (res.status === 401) {
    throw new UnauthorizedError();
  }
  console.log(res);
  const movieDetails = await res.json();
  console.log(movieDetails);

  return movieDetails;
};

export default {
  getList,
  getDetail,
};
