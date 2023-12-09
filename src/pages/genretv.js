import React, { useEffect, useState } from "react";
import axios from "axios";
import PopularCard from '../pages/popular.jsx';
import './popular.css';

const GenreTv = ({ userId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilter, setSearchFilter] = useState("movie");
  const [movies, setMovies] = useState([]);
  const apiKey = '0faf15cab9188a8b67efc636398b904b';
  const searchUrl = 'https://api.themoviedb.org/3/search/multi';
  const popularMoviesUrl = `https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1`;

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
          setMovies([]); 
        }
      }
    } catch (err) {
      console.error(err);
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

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      getPopularMovies();
    } else {
      searchMovies();
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  return (
    <div>
    <div className="nowplaying">
      <h1>Airing today in TV!</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search "
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
          <PopularCard key={index} movie={movie} userId={userId} />
        ))}
      </div>
    </div>
   </div>
  );
};

export default GenreTv;
