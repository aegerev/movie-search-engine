import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import MoviesList from './components/movies-list';
import Movie from './components/movie';

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';

import './App.css';

function App() {

  const user = React.useState(null);


  return (
    <BrowserRouter>
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="home">Movie Search Engine</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link href="/">Movies</Nav.Link>  
          </Nav>
          </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route path="/movies" element={<MoviesList />} />
        <Route path="/movies/:id" element={<Movie user={user} />} />
      </Routes>

      <h1>Hi Ariel!</h1>
    </div>
    </BrowserRouter>
  );
}

export default App;
