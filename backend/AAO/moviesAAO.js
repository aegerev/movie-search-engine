let movies;

export default class MoviesAAO{
    static async injectDB(conn){
        if(movies){
            return;
        }

        try {
            movies = await conn.db(process.env.MOVIEREVIEWS_NS).collection('movies');
        } catch(e) {
            console.error(`Unable to connect in MoviesAAO: ${e}`)
        }
    }

    static async getMovies({
        filters = null,
        page = 0,
        moviesPerPage = 20,
    } = {}){
        let query;

        if(filters) {
            if("title" in filters) {
                query = {$text: {$search: filters['title']}};
            } else if("rated"in filters) {
                query = "rated": {$eq: filters['rated']};
            }
        }
        let cursor;
        
        try {
            cursor = await movies
                .find(query)
                .limit(moviesPerPage)
                .skip(moviesPerPage * page)

                const moviesList = await cursor.toArray();

                const totalNumMovies = await movies.countDocuments(query);

                return {moviesList, totalNumMovies}
        } catch(e) {
            console.error(`Unable to issue find command, ${e}`)
        }
    }
}