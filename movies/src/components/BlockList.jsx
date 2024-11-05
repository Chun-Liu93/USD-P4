import React from 'react';
import {useEffect } from 'react';
import "../styles.css";
import { useMovies } from './MovieContext';

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

const BlockedMovies = ()=>{
    const { blockedMovies } = useMovies();

    return (
        <div className='main'>   
            <h1>Blocked Movies</h1>
            <ul className="popularmovie">
                {blockedMovies.length > 0 ? (
                blockedMovies.map((movie) => (
                    <li key={movie.id}>
                        <div className='movie'>
                            {/* <div className="genre">
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
                                <button className='block' onClick={() => onBlockMovie(movie)}>Block</button>
                            </div> */}
                            <img src={`${MOVIE_IMAGE_URL}${movie.poster_path}`} alt={movie.title} />
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
}

export default BlockedMovies;