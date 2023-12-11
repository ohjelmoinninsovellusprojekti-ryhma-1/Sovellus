import React, { useEffect, useState } from "react";
import axios from "axios";
import TvCard from '../pages/tvcard.jsx';


const PopularTv = ({ userId, username }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilter, setSearchFilter] = useState("movie");
  const [movies, setMovies] = useState([]);
  const apiKey = 'a676d18cf85d5c37a91f273496a3ffbb';
  const searchUrl = 'https://api.themoviedb.org/3/search/multi';
  const popularTvUrl = 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1';

  const searchMovies = async () => {
    try {
      const response = await axios.get(searchUrl, {
        params: {
          api_key: apiKey,
          query: searchTerm,
          include_adult: searchFilter === "movie",
        },
      });

      if (searchFilter === "movie") {
        setMovies(response.data.results);
      } else {
        const actorId = response.data.results.find(
          (result) => result.media_type === 'person'
        )?.id;

        if (actorId) {
          const tvShowsByActorResponse = await axios.get(
            `https://api.themoviedb.org/3/discover/tv`,
            {
              params: {
                api_key: apiKey,
                with_people: actorId,
                sort_by: 'popularity.desc',
              },
            }
          );
          setMovies(tvShowsByActorResponse.data.results);
        } else {
          setMovies([]); 
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getPopularTvShows = async () => {
    try {
      const response = await axios.get(popularTvUrl, {
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
      getPopularTvShows();
    } else {
      searchMovies();
    }
  };

  useEffect(() => {
    getPopularTvShows();
  }, []);

  return (
    <div className="popular">
      <h1>Popular TV-series</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        >
          <option value="movie">TV Series</option>
          <option value="person">Actor</option>
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="movie-card-container">
        {movies.map((movie, index) => (
          <TvCard key={index} movie={movie} userId={userId} username={username}  />
        ))}
      </div>
    </div>
  );
};

export default PopularTv;
