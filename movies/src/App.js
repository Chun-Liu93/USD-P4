import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MovieList from './components/MoviesList'; 
import Navbar from './components/Navbar';
import BlockedMovies from './components/BlockList';
import LikedMovies from './components/LikeList';
import { MoviesProvider } from './components/MovieContext';

const App = () => {
    return (
        <MoviesProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<MovieList />} />
                    <Route path="/Liked" element={<LikedMovies />} />
                    <Route path="/blocked" element={<BlockedMovies />} />
                </Routes>
            </Router>
        </MoviesProvider>
    );
};

export default App;
