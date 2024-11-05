import React from 'react';
import PageLayout from './components/PageLayout';
import MovieList from './components/MovieList';

const App = () => {
    return (
        <PageLayout>
            <MovieList />
        </PageLayout>
    );
};

export default App;
