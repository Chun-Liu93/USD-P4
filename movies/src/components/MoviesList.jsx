import React, { useEffect, useState } from 'react';
import { fetchMovieList, fetchGenres } from './Api'; 

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

    useEffect(() => {
        const loadMoviesAndGenres = async () => {
            const [movieData, genreData] = await Promise.all([fetchMovieList(), fetchGenres()]);
            
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
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Popular Movies</h1>
            <ul>
                {movies.map(movie => (
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
