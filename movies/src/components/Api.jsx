const SECRET_KEY = "6bbb24dcee455a115bf0b1ff7adf9275";
const MOVIE_LIST_KEY = "https://api.themoviedb.org/3/movie/popular";
// const MOVIE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
// const GENRES_URL = "https://api.themoviedb.org/3/genre/movie/list";

async function fetchMovieList(page = 1) {
    const popularMovieUrl = `${MOVIE_LIST_KEY}?api_key=${SECRET_KEY}&page=${page}`;
    try {
        const response = await fetch(popularMovieUrl);

        if (!response.ok) {
            throw new Error('Network response not ok');
        }

        const data = await response.json();
        return data.results;

    } catch (error) {
        console.error('Error fetching movie list', error);
        return [];
    }
}

export { fetchMovieList };