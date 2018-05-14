const movieApiDomain = 'https://api.themoviedb.org/3/';
const moviesApiKey = process.env.REACT_APP_MOVIE_API_KEY;
const moviesListRoute = 'discover/movie';
const moviesDetailRoute = 'movie/';

const moviesListEndpoint = () =>
  `${movieApiDomain}${moviesListRoute}?api_key=${moviesApiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

const moviesDetailEndpoint = id =>
  `${movieApiDomain}${moviesDetailRoute}${id}?api_key=${moviesApiKey}&language=en-US`;

const logErrors = (fn, onErrorOutput) =>
  function logErrorsWrapper(...theArgs) {
    return fn(...theArgs).catch((error) => {
      console.log(error); // eslint-disable-line no-console
      return onErrorOutput;
    });
  };

// Grab movies from API and apply currentTimestamp to storage
const getListHelper = async () => {
  console.log('grabbing movie list from API'); // eslint-disable-line no-console
  const res = await fetch(moviesListEndpoint());
  const movies = await res.json();
  const { results } = movies;

  return results;
};

const getList = logErrors(getListHelper, []);

const getDetailHelper = async (id) => {
  console.log('grabbing movie detail from API'); // eslint-disable-line no-console
  const res = await fetch(moviesDetailEndpoint(id));
  const movieDetails = await res.json();

  return movieDetails;
};

const getDetail = logErrors(getDetailHelper, {});

export default {
  getList,
  getDetail,
};
