import app from "./server.js";
import mongodb from 'mongodb';
import dotenv from 'dotenv';


async function main() {
    dotenv.config();

    const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI);

    try{
        await client.connect();

        
    } catch (e) {
        console.error(e);
        process.exit(1)
    }
}

main().catch(console.error);