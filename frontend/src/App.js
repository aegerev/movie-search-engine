import React from 'react';
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import MoviesList from './components/movies-list';
import Movie from './components/movie';
import Login from './components/login';

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';

import './App.css';

function App() {

  let [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user)
  }

  async function logout(user = null) {
    setUser(user)
  }

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="home">Movie Search Engine</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link href="/movies">Movies</Nav.Link>  
          <Nav.Link>
              {user ? (
                <a onClick={logout}>Logout User</a>
              ) : (
                <a href="/login">Login</a>
              )}
            </Nav.Link>
          </Nav>
          </Navbar.Collapse>
      </Navbar>
      <h1>Hi Ariel!</h1>
    </div>
  );
}

export default App;
