import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from '../pages/moviecard.jsx';


const Popular = ({ userId, username }) => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilter, setSearchFilter] = useState("movie");
  const [movies, setMovies] = useState([]);
  const apiKey = 'a676d18cf85d5c37a91f273496a3ffbb';
  const searchUrl = 'https://api.themoviedb.org/3/search/multi';
  const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
  
  
  const searchMovies = async () => {
    try {
      let response;
      if (searchFilter === "movie") {
        response = await axios.get(searchUrl, {
          params: {
            api_key: apiKey,
            query: searchTerm,
            include_adult: false,
          },
        });
      } else if (searchFilter === "person") {
        const actorResponse = await axios.get(searchUrl, {
          params: {
            api_key: apiKey,
            query: searchTerm,
            include_adult: false,
          },
        });
  
        const actorId = actorResponse.data.results.find(
          (result) => result.media_type === 'person'
        )?.id;
  
        if (actorId) {
          try {
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
          } catch (error) {
            console.error(error);
          }
        } else {
          setMovies([]); 
        }
        return;
      } else if (searchFilter === "releaseYear") {
        response = await axios.get(popularMoviesUrl, {
          params: {
            api_key: apiKey,
          },
        });
  
        
        const releaseYear = parseInt(searchTerm);
  
        const filteredMovies = response.data.results.filter((movie) => {
          if (movie.release_date) {
            const movieYear = new Date(movie.release_date).getFullYear();
            return movieYear === releaseYear;
          }
          return false;
        });
  
        setMovies(filteredMovies);
        return;
      }
  
      setMovies(response.data.results);
    } catch (err) {
      console.error(err);
    }
  };
  

  const getPopularMovies = async () => {
    try {
      console.log('UserId in Popular component:', userId);
      console.log('Username in Popular component:', username);
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
    <div className="popular">
      <h1>Popular Movies</h1>
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
          <option value="movie">Movie</option>
          <option value="person">Actor</option>
          <option value="releaseYear">Release Year</option>
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="movie-card-container">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} userId={userId} username={username}  />
        ))}
      </div>
    </div>
  );
};

export default Popular;
