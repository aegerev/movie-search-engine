import React from 'react';
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import MoviesList from './components/movies-list';
import Movie from './components/movie';
import Login from './components/login';

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Hello Ariel!</h1>
    </div>
  );
}

export default App;
