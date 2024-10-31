const SECRET_KEY = "6bbb24dcee455a115bf0b1ff7adf9275";
const MOVIE_LIST_KEY = "https://api.themoviedb.org/3/movie/popular";
// const MOVIE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const GENRES_URL = "https://api.themoviedb.org/3/genre/movie/list";

// const genreColors = {
//     'Action': 'generate-action',
//     'Adventure': 'generate-adventure',
//     'Animation': 'generate-animation',
//     'Comedy': 'generate-comedy',
//     'Crime': 'generate-crime',
//     'Documentary': 'generate-documentary',
//     'Drama': 'generate-drama',
//     'Family': 'generate-family',
//     'Fantasy': 'generate-fantasy',
//     'History': 'generate-history',
//     'Horror': 'generate-horror',
//     'Music': 'generate-music',
//     'Mystery': 'generate-mystery',
//     'Romance': 'generate-romance',
//     'Science Fiction': 'generate-scifi',
//     'TV-Movie': 'generate-tv-movie',
//     'Thriller': "generate-thriller",
//     'War': 'generate-war',
//     'Western': 'generate-western'
// }

async function fetchGenres() {
    const genreUrl = `${GENRES_URL}?api_key=${SECRET_KEY}`;
    try{
        const response = await fetch(genreUrl);
        if (!response.ok) {
            throw new Error('Network response not ok')
        }

        const data = await response.json();
        return data.genres;
    } catch (error) {
        console.error('Error fetching genres', error);
        return [];
    }
}

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

export { fetchMovieList, fetchGenres };