import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import movies from './api/movies.route.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/api/v1/movies", movies);
app.use('*', (req, res) => {
    res.status(404).json({error: "not found"})
})

app.listen(port, () => {
    console.log("Activate Port " + port);
})