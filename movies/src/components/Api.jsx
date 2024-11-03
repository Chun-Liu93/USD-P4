import { useState } from "react";

const SECRET_KEY = "6bbb24dcee455a115bf0b1ff7adf9275";
const MOVIE_LIST_KEY = "https://api.themoviedb.org/3/movie/popular";
const GENRES_URL = "https://api.themoviedb.org/3/genre/movie/list";
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie";

async function fetchGenres() {
    const genreUrl = `${GENRES_URL}?api_key=${SECRET_KEY}`;
    try{
        const response = await fetch(genreUrl);
        if (!response.ok) {
            throw new Error('Network response not ok')
        }

        const data = await response.json();
        return data.genres;
    } catch (error) {
        console.error('Error fetching genres', error);
        return [];
    }
}

async function fetchMovieList(page = 1, genreId = null, searchQuery = "") {
    let movieUrl;

    if (searchQuery) {
        movieUrl = `${SEARCH_URL}?api_key=${SECRET_KEY}&query=${encodeURIComponent(searchQuery)}&page=${page}`;
        if (genreId) {
            movieUrl += `&with_genres=${genreId}`;
        }
    } else {
        movieUrl = `${MOVIE_LIST_KEY}?api_key=${SECRET_KEY}&page=${page}`;
        if (genreId) {
            movieUrl += `&with_genres=${genreId}`;
        }
    }

    try {
        const response = await fetch(movieUrl);
        if (!response.ok) {
            throw new Error("Network response not ok");
        }

        const data = await response.json();
        return data.results;

    } catch (error) {
        console.error("Error fetching movie list", error);
        return [];
    }
}


async function fetchSearchResults(query, page = 1) {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${SECRET_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
    try {
        const response = await fetch(searchUrl);
        if (!response.ok) {
            throw new Error('Network response not ok');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching search results', error);
        return [];
    }
}

export { fetchMovieList, fetchGenres, fetchSearchResults };


