// NowPlaying.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MovieCard } from '../components/MovieCard/MovieCard';
import '../components/MovieCard/MovieCard.css';


const NowPlaying = () => {
  const [movies, setMovies] = useState([]);
  const apiKey = 'a676d18cf85d5c37a91f273496a3ffbb';
  const nowPlayingMoviesUrl = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`;

  const getNowPlayingMovies = async () => {
    try {
      const response = await axios.get(nowPlayingMoviesUrl, {
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
    getNowPlayingMovies();
  }, []);

  return (
    <div className="movie-card-container"> {/* Apply the container class */}
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </div>
  );
};

export default NowPlaying;
