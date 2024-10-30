import React, { useEffect, useState } from 'react';
import { fetchMovieList } from './Api'; 

const MOVIE_IMAGE_URL = "https://image.tmdb.org/t/p/w500"; 

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMovies = async () => {
            const movieData = await fetchMovieList();
            setMovies(movieData);
            setLoading(false);
        };

        loadMovies();
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
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieList;
