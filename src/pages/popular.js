// Popular.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MovieCard } from '../components/MovieCard/MovieCard';

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const apiKey = 'a676d18cf85d5c37a91f273496a3ffbb';
  const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;

  const getPopularMovies = async () => {
    try {
      const response = await axios.get(popularMoviesUrl, {
        params: {
          api_key: apiKey,
        },
      });
      setMovies(response.data.results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  return (
    <div className="popular">
      <h1>Popular Movies</h1>
      <div className="movie-list">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Popular;
