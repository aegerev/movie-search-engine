import express from 'express';
import MoviesController from './movies.controller.js';

const router = express.Router();

router.route('/').get(MoviesController.apiGetMovies);

// router.route('/').get((req, res) => res.send("Hello, Ariel!"));

export default router;