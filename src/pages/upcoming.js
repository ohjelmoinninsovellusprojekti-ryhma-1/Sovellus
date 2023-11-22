// Upcoming.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MovieCard } from '../components/MovieCard/MovieCard';

const Upcoming = () => {
  const [movies, setMovies] = useState([]);
  const apiKey = 'a676d18cf85d5c37a91f273496a3ffbb';
  const upcomingMoviesUrl = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`;

  const getUpcomingMovies = async () => {
    try {
      const response = await axios.get(upcomingMoviesUrl, {
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
    getUpcomingMovies();
  }, []);

  return (
    <div className="upcoming">
      <h1>Upcoming Movies</h1>
      <div className="movie-list">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Upcoming;
