import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MovieList from './components/MoviesList'; 
import Navbar from './components/Navbar';
import BlockedMovies from './components/BlockedMovies';
import LikedMovies from './components/LikedMovies';
import {useState } from 'react';

const App = () => {
    const [blockedMovies, setBlockedMovies] = useState([]);
    const [likedMovies, setLikedMovies] = useState([]);

    const handleBlockMovie = (movie) => {
        setBlockedMovies((prevBlocked) => {
            const isAlreadyBlocked = prevBlocked.some(blocked => blocked.id === movie.id);
            if (!isAlreadyBlocked) {
                setLikedMovies((prevLiked) => prevLiked.filter(liked => liked.id !== movie.id));
                console.log("Adding movie to blocked:", movie);
                return [...prevBlocked, movie];
            }
            return prevBlocked; 
        });
    };

    const handleLikeMovie = (movie) => {
        setLikedMovies((prevLiked) => {
            const isAlreadyLiked = prevLiked.some(Liked => Liked.id === movie.id);
            if (!isAlreadyLiked) {
                setBlockedMovies((prevBlocked) => prevBlocked.filter(blocked => blocked.id !== movie.id));
                console.log("Adding movie to blocked:", movie);
                return [...prevLiked, movie];
            }
            return prevLiked; 
        });
    };

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<MovieList onBlockMovie={handleBlockMovie} onLikeMovie={handleLikeMovie}/>} />
                <Route path="/Liked" element={<LikedMovies movies={likedMovies} />} />
                <Route path="/blocked" element={<BlockedMovies movies={blockedMovies} />} />
            </Routes>
        </Router>
    );
};

export default App;
