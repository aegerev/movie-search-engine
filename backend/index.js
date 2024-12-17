import app from "./server.js";
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import MoviesAAO from "./AAO/moviesAAO.js";

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