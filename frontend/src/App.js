import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import {Link} from "react-router-dom";

import MoviesList from './components/movies-list';
import Movie from './components/movie';

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import MovieDataService from './services/movies.js'


import './App.css';

function App() {

  const user = React.useState(null);

    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchRating, setSearchRating] = useState("");
    const [ratings, setRatings] = useState(["All Ratings"])

    useEffect(() => {
        retrieveMovies();
        retrieveRatings();
    }, []);

    const retrieveMovies = () => {
        MovieDataService.getAll()
            .then(response => {
                console.log(response.data);
                setMovies(response.data.movies);
            })
            .catch(e => {
                console.log(e);
            })
        }

       const retrieveRatings = () => {
        MovieDataService.getRatings()
            .then(response => {
                console.log(response.data);
                setRatings(["All Ratings"].concat(response.data))
            })
            .catch(e => {
                console.log(e);
            })
       } 

       const onChangeSearchTitle = e => {
         const searchTitle = e.target.value;
         setSearchTitle(searchTitle);
       }

       const onChangeSearchRating = e => {
        const searchRating = e.target.value;
        setSearchRating(searchRating);
       }

       const find = (query, by) => {
        MovieDataService.find(query,by)
            .then(response => {
                console.log(response.data);
                setMovies(response.data.movies)
            })
            .catch(e => {
                console.log(e);
            })
       }

       const findByTitle = () => {
        find(searchTitle, "title");
       }

       const findByRating = () => {
        if(searchRating === "All Ratings") {
            // retrieveMovies()
            return;
        } else {
            find(searchRating, "rated");
        }
       }

  return (
    <BrowserRouter>
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="home">Movie Search Engine</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link href="/api/v1/movies">Movies</Nav.Link> 
            </Nav>
          </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route path="/movies" element={<MoviesList />} />
        <Route path="/movies/:id" element={<Movie user={user} />} />
      </Routes>

      <Container>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                 type="text"
                                 placeholder="Search by title"
                                 value={searchTitle}
                                 onChange={onChangeSearchTitle}
                                 />
                            </Form.Group>

                            <Button 
                             variant="primary"
                             type="button"
                             onClick={findByTitle}
                             >Search
                             </Button>
                        </Col>

                        <Col>
                        <Form.Group>
                                <Form.Control
                                 as="select"
                                 onChange={onChangeSearchRating}>
                                    {ratings.map(rating => {
                                        return(
                                            <option value={rating}>{rating}</option>
                                        )
                                    })}
                                 </Form.Control>
                                 </Form.Group>
                                
                             <Button 
                                 variant="primary"
                                 type="button"
                                 onClick={findByRating}
                                >Search
                             </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
      <h1>Hi Ariel!</h1>
    </div>
    </BrowserRouter>
  );
}

export default App;
