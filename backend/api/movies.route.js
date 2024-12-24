import express from 'express';
import MoviesController from './movies.controller.js';

const router = express.Router();

router.get('/', async (req, res, next) => { 
  try {
    const { moviesList, totalNumMovies } = await MoviesController.apiGetMovies(req, res, next);
    res.json({
      movies: moviesList,
      page: req.query.page,
      filters: req.query,
      entries_per_page: req.query.moviesPerPage,
      total_results: totalNumMovies
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching movies.' });
  }
});

router.get('/id/:id', async (req, res, next) => {
  try {
    const movie = await MoviesController.apiGetMovieByID(req, res, next); 
    if (!movie) {
      res.status(404).json({ error: 'Movie not found' }); 
    } else {
      res.json(movie);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching movie.' });
  }
});

router.get('/ratings', async (req, res, next) => {
  try {
    const ratings = await MoviesController.apiGetRatings(req, res, next);
    res.json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching ratings.' });
  }
});

export default router;

// router.route('/').get((req, res) => res.send("Hello, Ariel!"));

