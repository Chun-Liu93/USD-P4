import React, { useEffect, useState } from 'react';
import { useMovies } from './MovieContext';
import { fetchGenres } from './Api';
import '../styles.css';

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

const BlockedMovies = () => {
    const { blockedMovies } = useMovies();
    const [genres, setGenres] = useState({});

    useEffect(() => {
        const loadGenres = async () => {
            const genreData = await fetchGenres();
            const genreMap = {};
            genreData.forEach(genre => {
                genreMap[genre.id] = genre.name;
            });
            setGenres(genreMap);
        };
        loadGenres();
    }, []);

    return (
        <div className='main'>
            <h1>Blocked Movies</h1>
            <ul className="popularmovieblocked">
                {blockedMovies.length > 0 ? (
                    blockedMovies.map((movie) => (
                        <li key={movie.id}>
                            <div className='movie'>
                                <div className="genre">
                                    <div className='title'>Genre</div>
                                    <div className='genrespan'>
                                        {movie.genre_ids.map(id => {
                                            const genreName = genres[id];
                                            if (!genreName) return null; // skip if no genre name
                                            const genreClass = genreColors[genreName] || 'default-genre';
                                            return (
                                                <span key={id} className={genreClass}>
                                                    {genreName}
                                                </span>
                                            );
                                        })}
                                    </div>
                                    <p>Release Date: {movie.release_date}</p>
                                </div>
                                <img 
                                    src={movie.poster_path ? `${MOVIE_IMAGE_URL}${movie.poster_path}` : 'fallback-image-url.jpg'} 
                                    alt={movie.title} 
                                />
                                <h2>{movie.title}</h2>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No blocked movies yet.</p>
                )}
            </ul>
        </div>
    );
};

export default BlockedMovies;
