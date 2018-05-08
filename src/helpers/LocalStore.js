// Movies List
const STORAGE_TIMESTAMP = 'movies-timestamp';
const STORAGE_MOVIES = 'movies';

// Individual Movies

const localStorage = window.localStorage || {};

// Compare the localDataTimestamp with the currentTimestamp and determine whether
// localDataTimestamp is expired based on hoursAllowed
function localDataIsExpired(localDataTimestamp, currentTimestamp, hoursAllowed = 1) {
  const HOURS_CONSIDERED_FRESH = hoursAllowed;
  const MS_IN_HOUR = 1000 * 3600;
  const ALLOWED_TIME_DELTA = HOURS_CONSIDERED_FRESH * MS_IN_HOUR;

  const convertedCurrentTimeStamp = parseFloat(currentTimestamp);
  const convertedLocalTimeStamp = parseFloat(localDataTimestamp);

  if ([convertedCurrentTimeStamp, convertedLocalTimeStamp].some(stamp => Number.isNaN(stamp))) {
    return true;
  }

  if (parseFloat(currentTimestamp) - parseFloat(localDataTimestamp) > ALLOWED_TIME_DELTA) {
    return true;
  }
  return false;
}

function getStoredMovies() {
  const moviesString = localStorage.getItem(STORAGE_MOVIES);
  if (moviesString === null) {
    return null;
  }
  const moviesArray = JSON.parse(moviesString);
  if (!Array.isArray(moviesArray)) {
    return null;
  }
  return moviesArray;
}

function storeMovies(movies, timestamp) {
  localStorage.setItem(STORAGE_MOVIES, JSON.stringify(movies));
  localStorage.setItem(STORAGE_TIMESTAMP, timestamp);
}

function getStoredMoviesTimestamp() {
  return parseFloat(localStorage.getItem(STORAGE_TIMESTAMP));
}

function createTimestamp() {
  return new Date().getTime();
}

export default {
  getStoredMovies,
  localDataIsExpired,
  getStoredMoviesTimestamp,
  createTimestamp,
  storeMovies,
};
