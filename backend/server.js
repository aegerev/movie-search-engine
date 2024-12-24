import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongodb from 'mongodb';

import movies from './api/movies.route.js';
import MoviesAAO from "./AAO/moviesAAO.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/v1/movies", movies);
app.use('*', (req, res) => {
    res.status(404).json({error: "not found"})
})

async function main() {

    const port = process.env.PORT || 5000;

    dotenv.config();

    const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI);

    try{
        await client.connect();
        await MoviesAAO.injectDB(client);

        app.listen(port, () => {
            console.log("Activate Port " + port);
        })
        
    } catch (e) {
        console.error(e);
        process.exit(1)
    }
}

main().catch(console.error);

export default app;