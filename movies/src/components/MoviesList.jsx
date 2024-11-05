// src/components/MoviesList.jsx
import React, { useEffect, useState } from 'react';
import { fetchMovieList, fetchGenres } from './Api';
import Pagination from './Pagination'; 
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
            console.log("Fetched Genres:", genreMap);
            
            // Fetch movies based on search query and selected genre
            let movieData = await fetchMovieList(pages, selectedGenre, searchQuery);
            console.log("Fetched Movies:", movieData);
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

    if (loading) return <div>Loading...</div>;

    return (
        <div className="main">
            <h1>Popular Movies</h1>

            {/* Pagination component */}
            <Pagination pages={pages} setPages={setPages} />

            {/* Genre Selector */}
            <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
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
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <div className='movie'>
                            <div className="genre">
                                <div className='title'>Genre</div>
                                <div className='genrespan'>
                                    {movie.genre_ids.map(id => {
                                        const genreName = genres[id];
                                        const genreClass = genreColors[genreName] || 'default-genre';
                                        
                                        return (
                                            <span key={id} className={genreClass}>
                                                {genreName}
                                            </span>
                                        );
                                    })}
                                </div>
                                <p>Release Date: {movie.release_date}</p>
                                <button className='like'>Like</button>
                                <button className='block'>Block</button>
                            </div>
                            <img src={`${MOVIE_IMAGE_URL}${movie.poster_path}`} alt={movie.title} />
                            <h2>{movie.title}</h2>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieList;
