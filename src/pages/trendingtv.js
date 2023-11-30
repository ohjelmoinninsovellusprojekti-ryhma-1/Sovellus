import React, { useEffect, useState } from "react";
import axios from "axios";
import { PopularCard } from '../pages/popular.jsx';
import './popular.css';

const TrendingTv = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilter, setSearchFilter] = useState("tv");
  const [movies, setMovies] = useState([]);
  const apiKey = 'a676d18cf85d5c37a91f273496a3ffbb';
  const searchUrl = 'https://api.themoviedb.org/3/search/multi';
  const trendingTvUrl = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US';

  const searchTvSeries = async () => {
    try {
      const response = await axios.get(searchUrl, {
        params: {
          api_key: apiKey,
          query: searchTerm,
          include_adult: searchFilter === "tv",
        },
      });

      if (searchFilter === "tv") {
        setMovies(response.data.results);
      } else {
        const actorId = response.data.results.find(
          (result) => result.media_type === 'person'
        )?.id;

        if (actorId) {
          const tvSeriesByActorResponse = await axios.get(
            `https://api.themoviedb.org/3/discover/tv`,
            {
              params: {
                api_key: apiKey,
                with_people: actorId,
                sort_by: 'popularity.desc',
              },
            }
          );
          setMovies(tvSeriesByActorResponse.data.results);
        } else {
          setMovies([]); 
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getTrendingTvSeries = async () => {
    try {
      const response = await axios.get(trendingTvUrl, {
        params: {
          api_key: apiKey,
        },
      });
      setMovies(response.data.results);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      getTrendingTvSeries();
    } else {
      searchTvSeries();
    }
  };

  useEffect(() => {
    getTrendingTvSeries();
  }, []);

  return (
    <div className="nowplaying">
      <h1>Trending TV-series</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by actor or TV series name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        >
          <option value="tv">TV Series</option>
          <option value="person">Actor</option>
        </select>
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

export default TrendingTv;
