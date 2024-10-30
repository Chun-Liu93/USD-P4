import React from 'react';
import MovieList from './components/MoviesList'; 
import Navbar from './components/Navbar';

const App = () => {
    return (
        <div>
            <Navbar />
            <MovieList />
        </div>
    );
};

export default App;
