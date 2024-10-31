import React, { useEffect, useState } from 'react';
import { fetchMovieList, fetchGenres } from './Api'; 

const MOVIE_IMAGE_URL = "https://image.tmdb.org/t/p/w500"; 

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
                        <p>
                            Genres: {movie.genre_ids.map(id => genres[id]).join(', ')}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieList;
