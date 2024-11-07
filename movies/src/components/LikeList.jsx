import React, { useEffect, useState } from 'react';
import { fetchGenres } from './Api';
import { useMovies } from './MovieContext';
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

const LikedMovies = () => {
    const { likedMovies } = useMovies();
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
            <h1>Liked Movies</h1>
            <ul className="popularmovie">
                {likedMovies.length > 0 ? (
                    likedMovies.map((movie) => (
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
                                </div>
                                <img src={`${MOVIE_IMAGE_URL}${movie.poster_path}`} alt={movie.title} />
                                <h2>{movie.title}</h2>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No Liked movies yet.</p>
                )}
            </ul>
        </div>
    );
}

export default LikedMovies;
