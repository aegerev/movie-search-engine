import MoviesAAO from "../AAO/moviesAAO.js";
import express from "express";

let router = express.Router();

export default class MoviesController{
    static async apiGetMovies(req, res, next) {
        const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage): 20;
        const page = req.query.page ? parseInt(req.query.page):0;

        let filters = {};

        if(req.query.rated) {
            filters.rated = req.query.rated;
        } else if(req.query.title) {
            filters.title = req.query.title;
        }

        const { moviesList, totalNumMovies } = await MoviesAAO.getMovies({filters, page, moviesPerPage});

        let response = {
            movies: moviesList,
            page: page,
            filters: filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies,
        }
        res.json(response);
    }

    static async apiGetMovieByID(req, res, next) {
        try {
            let id = req.params.id || {};
            let movie = await MoviesAAO.getMovieByID(id);

            if(!movie){
                res.status(404).json({error:"not found"});
                return;
            }
            res.json(movie);
        } catch(e) {
            console.log(`api, ${e}`);
            res.status(500).json({error: e});
        }
    }

    static async apiGetRatings(req, res, next) {
        try {
            let propertyTypes = await MoviesAAO.getRatings();

            res.json(propertyTypes);

        } catch (error) {
            console.log(`api, ${e}`);

            res.status(500).json({error: e});
        }
    }
}