import app from "./server";
import mongodb from 'mongodb';
import dotenv from 'dotenv';

async function main() {
    dotenv.config();

    const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI)
    const port = process.env.PORT || 1000;

    try{
        await client.connect();

        app.listen(port, () => {
            console.log("Activate Port " + port);
        })
    } catch (e) {
        console.error(e);
        process.exit(1)
    }
}

main().catch(console.error);