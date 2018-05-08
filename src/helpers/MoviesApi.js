const movieApiDomain = 'https://api.themoviedb.org/3/';
const moviesApiKey = 'a2ad2841c78482e5b35edc0dc31ffd51';
const moviesListRoute = 'discover/movie';
const moviesDetailRoute = 'movie/';

const moviesListEndpoint = () =>
  `${movieApiDomain}${moviesListRoute}?api_key=${moviesApiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

const moviesDetailEndpoint = id =>
  `${movieApiDomain}${moviesDetailRoute}${id}?api_key=${moviesApiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

// Grab movies from API and apply currentTimestamp to storage
const getList = async () => {
  console.log('grabbing movie list from API'); // eslint-disable-line no-console
  try {
    const res = await fetch(moviesListEndpoint());
    const movies = await res.json();
    const { results } = movies;

    return results;
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
    return [];
  }
};

const getDetail = async (id) => {
  console.log('grabbing movie detail from API'); // eslint-disable-line no-console
  try {
    const res = await fetch(moviesDetailEndpoint(id));
    const movieDetails = await res.json();

    return movieDetails;
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
    return {};
  }
};

export default {
  getList,
  getDetail,
};
