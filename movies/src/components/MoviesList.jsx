import React, { useEffect, useState } from 'react';
import { fetchMovieList, fetchGenres } from './Api'; 
import '../styles.css';

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
    const [hoveredIndex, setHoveredIndex] = useState(null);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="main">
            <h1>Popular Movies</h1>
            <button disabled={pages===1 ? true : false} onClick={leftPages}>prev</button>
            <p>Pages: {pages}</p>
            <button onClick={rightPages}>next</button>
            <ul className="popularmovie">
                {movies.map((movie,index) => (
                    <li key={movie.id}
                        onMouseEnter={()=>{setHoveredIndex(index)}}
                        onMouseLeave={()=>{setHoveredIndex(null)}}
                    >
                        <img src={`${MOVIE_IMAGE_URL}${movie.poster_path}`} alt={movie.title} 
                        style={{ opacity: hoveredIndex === index ? 0.2 : 1 }}/>
                        <h2>{movie.title}</h2>
                        <p>Release Date: {movie.release_date}</p>
                        
                        <div class="genre" style={{ display: hoveredIndex === index ? 'flex' : 'none' }}>
                            <p>Genre</p>
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
