/* eslint-disable max-len */
const moviesEndpoint =
  'https://api.themoviedb.org/3/discover/movie?api_key=a2ad2841c78482e5b35edc0dc31ffd51&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
/* eslint-enable */

// Grab movies from API and apply currentTimestamp to storage
const getList = async () => {
  console.log('grabbing data from API'); // eslint-disable-line no-console
  try {
    const res = await fetch(moviesEndpoint);
    const movies = await res.json();
    const { results } = movies;

    return results;
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
    return [];
  }
};

export default {
  getList,
};
