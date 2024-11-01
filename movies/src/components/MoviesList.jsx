import React, { useEffect, useState } from 'react';
import { fetchMovieList, fetchGenres } from './Api'; 
import "../styles.css"
const MOVIE_IMAGE_URL = "https://image.tmdb.org/t/p/w500"; 

// Define genre colors
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
    const [isDisabled, setIsDisabled] = useState(true);

    const [selectedGenre, setSelectedGenre] = useState("");

    useEffect(() => {
        const loadMoviesAndGenres = async () => {
            const [movieData, genreData] = await Promise.all([fetchMovieList(pages), fetchGenres()]);
            
            // Map genre IDs to genre names
            const genreMap = {};
            genreData.forEach(genre => {
                genreMap[genre.id] = genre.name;
            });

            setGenres(genreMap);
            setMovies(movieData);
            setLoading(false);
        };

        loadMoviesAndGenres();
    }, [pages]);

const leftPages = ()=>{
    setPages(pages - 1);
} 
const rightPages = ()=>{
    setPages(pages+1);
} 

    const filteredMovies = movies.filter(movie => {
        const matchesGenre = selectedGenre ? movie.genre_ids.includes(parseInt(selectedGenre)) : true;
        const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesGenre && matchesSearch;
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div class="main">
            <h1>Popular Movies</h1>
            <button disabled={pages===1 ? true : false} onClick={leftPages}>prev</button>
            <p>Pages: {pages}</p>
            <button onClick={rightPages}>next</button>
            <ul class="popularmovie">
                {movies.map(movie => (

            
            {/* Genre Filter Dropdown */}
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
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <ul>
                {filteredMovies.map(movie => (

                    <li key={movie.id}>
                        <img src={`${MOVIE_IMAGE_URL}${movie.poster_path}`} alt={movie.title} />
                        <h2>{movie.title}</h2>
                        <p>Release Date: {movie.release_date}</p>
                        
                        <div>
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
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieList;