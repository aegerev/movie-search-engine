import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import Movie from './movie.js';
import MovieDataService from '../services/movies.js';

import {Link} from "react-router-dom";

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';


const MoviesList = props => {
    const user = React.useState(null);

    const [movies, setMovies] = useState([]);
    const[searchTitle, setSearchTitle] = useState("");
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
                setMovies(response.data.movies);
            }) 
            .catch(error => {
                console.log(error);
            })
       }

       const findByTitle = () => {
        find(searchTitle, "title");
       }

       const findByRating = () => {
        if(searchRating=== "All Ratings"){
            retrieveMovies();
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
        {/* <Route path="/movies/:id" element={<Movie user={user} />} /> */}
      </Routes>

      <Container>
                <Row>
                   {movies.map((movie) => {
                    return (
                        <Col>
                            <Card style={{width: '18rem'}}>
                                <Card.Img src={movie.poster+"/100px180"}/>
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text>
                                        Rating: {movie.rated}
                                    </Card.Text>
                                    <Card.Text>{movie.plot}</Card.Text>
                                    <Link to={"movies/" + movie._id}>View Movie Details </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                   })} 
                </Row>
            </Container>

      {/* <h1>Hi Ariel!</h1> */}
    </div>
    </BrowserRouter>
  );
}

export default MoviesList;