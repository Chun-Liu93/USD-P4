import React, { useEffect, useState } from 'react';
import { fetchMovieList, fetchGenres, fetchSearchResults } from './Api';
import "../styles.css";

const MOVIE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const genreColors = {
    'Action': 'generate-action',
    'Adventure': 'generate-adventure',
    'Animation': 'generate-animation',
    'Comedy': 'generate-comedy',
    'Crime': 'generate-crime',
    'Documentary': 'generate-documentary',
    'Drama': 'generate-drama',
    'Family': 'generate-family',
    'Fantasy': 'generate-fantasy',
    'History': 'generate-history',
    'Horror': 'generate-horror',
    'Music': 'generate-music',
    'Mystery': 'generate-mystery',
    'Romance': 'generate-romance',
    'Science Fiction': 'generate-scifi',
    'TV-Movie': 'generate-tv-movie',
    'Thriller': "generate-thriller",
    'War': 'generate-war',
    'Western': 'generate-western'
};

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState({});
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const loadMoviesAndGenres = async () => {
            setLoading(true);
            const genreData = await fetchGenres();
            const genreMap = {};
            genreData.forEach(genre => {
                genreMap[genre.id] = genre.name;
            });
            setGenres(genreMap);
            
            let movieData = [];
            if (searchQuery) {
                movieData = await fetchSearchResults(searchQuery, pages);
            } else {
                movieData = await fetchMovieList(pages, selectedGenre);
            }
            setMovies(movieData);
            setLoading(false);
        };

        loadMoviesAndGenres();
    }, [pages, searchQuery, selectedGenre]);

    const handleSearchKeyPress = (e) => {
        if (e.key === "Enter") {
            setSearchQuery(e.target.value);
            setPages(1); // Reset to first page on new search
        }
    };
    

    const leftPages = () => {
        if (pages > 1) setPages(pages - 1);
    };

    const rightPages = () => {
        setPages(pages + 1);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="main">
            <h1>Popular Movies</h1>
            <button disabled={pages === 1} onClick={leftPages}>Prev</button>
            <p>Page: {pages}</p>
            <button onClick={rightPages}>Next</button>

            <select onChange={(e) => setSelectedGenre(e.target.value)} value={selectedGenre}>
                <option value="">All Genres</option>
                {Object.entries(genres).map(([id, name]) => (
                    <option key={id} value={id}>{name}</option>
                ))}
            </select>

{/* Search Bar */}
            <input 
                type="text" 
                placeholder="Search by title..." 
                onKeyDown={handleSearchKeyPress}
            />


            <ul className="popularmovie">
                {movies.map(movie => {
                    const movieGenreNames = movie.genre_ids.map(id => genres[id] || ""); 
                    const genreClass = movieGenreNames.find(name => genreColors[name]) || "";

                    return (
                        <li key={movie.id} className={genreColors[genreClass]}>
                            <img src={`${MOVIE_IMAGE_URL}${movie.poster_path}`} alt={movie.title} />
                            <h2>{movie.title}</h2>
                            <p>Release Date: {movie.release_date}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default MovieList;
