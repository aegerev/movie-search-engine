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
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="home">Movie Search Engine</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>  
            <Nav.Link href="#link">Link</Nav.Link>  
          </Nav>
          </Navbar.Collapse>
      </Navbar>
      <h1>Hi Ariel!</h1>
    </div>
  );
}

export default App;
