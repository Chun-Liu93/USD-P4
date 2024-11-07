import React, { createContext, useContext, useState } from 'react';

const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
    const [blockedMovies, setBlockedMovies] = useState([]);
    const [likedMovies, setLikedMovies] = useState([]);

    const handleBlockMovie = (movie) => {
        setBlockedMovies((prevBlocked) => {
            if (!prevBlocked.some(blocked => blocked.id === movie.id)) {
                setLikedMovies((prevLiked) => prevLiked.filter(liked => liked.id !== movie.id));
                return [...prevBlocked, movie];
            }
            return prevBlocked;
        });
    };

    const handleLikeMovie = (movie) => {
        setLikedMovies((prevLiked) => {
            if (!prevLiked.some(liked => liked.id === movie.id)) {
                setBlockedMovies((prevBlocked) => prevBlocked.filter(blocked => blocked.id !== movie.id));
                return [...prevLiked, movie];
            }
            return prevLiked;
        });
    };

    return (
        <MoviesContext.Provider value={{ blockedMovies, likedMovies, handleBlockMovie, handleLikeMovie }}>
            {children}
        </MoviesContext.Provider>
    );
};

export const useMovies = () => useContext(MoviesContext);
