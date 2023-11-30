// Popular.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PopularCard} from '../pages/popular.jsx';
import './popular.css';

const TopRated = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const apiKey = 'a676d18cf85d5c37a91f273496a3ffbb';
  const popularMoviesUrl = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`;
  const searchPeopleUrl = 'https://api.themoviedb.org/3/search/multi';

  const searchMoviesByActor = async () => {
    try {
      const response = await axios.get(searchPeopleUrl, {
        params: {
          api_key: apiKey,
          query: searchTerm,
        },
      });

      const actorId = response.data.results.find(
        (result) => result.media_type === 'person'
      )?.id;

      if (actorId) {
        const moviesByActorResponse = await axios.get(
          `https://api.themoviedb.org/3/discover/movie`,
          {
            params: {
              api_key: apiKey,
              with_people: actorId,
              sort_by: 'popularity.desc',
            },
          }
        );
        setMovies(moviesByActorResponse.data.results);
      } else {
        const combinedResultsResponse = await axios.get(searchPeopleUrl, {
          params: {
            api_key: apiKey,
            query: searchTerm,
          },
        });
        setMovies(combinedResultsResponse.data.results);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
    
      getPopularMovies();
    } else {
      searchMoviesByActor();
      setSearchTerm("");
    }
  };




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
      <h1>Top-Rated Movies</h1>
      <div className="search-bar">
            <input
              type="text"
              placeholder="Search by actor or movie name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
      <div className="movie-card-container">
        {movies.map((movie, index) => (
          <PopularCard key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default TopRated;
