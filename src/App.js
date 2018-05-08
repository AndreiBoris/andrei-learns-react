import React from 'react';
import logo from './logo.svg';
import tmdb from './tmdb.svg';
import './App.css';
import MoviesList from './MoviesList';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <MoviesList />
    <footer>
      <img src={tmdb} alt="The Movie Database Logo" className="Footer-logo" />
      This product uses the TMDb API but is not endorsed or certified by TMDb.
    </footer>
  </div>
);

export default App;
