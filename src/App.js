
import './App.css';
import { useEffect, useState } from "react";
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from "axios";
import { MovieCard } from './components/MovieCard/MovieCard';
import '@fontsource/poppins'; 
import Logo from './logo';
import NavigationButton from './NavigationButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faTv, faStar, faPlay } from '@fortawesome/free-solid-svg-icons';
import Popular from './pages/popular';
import Nowplaying from './pages/nowplaying';
import Upcoming from './pages/upcoming';



function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const apiKey = 'a676d18cf85d5c37a91f273496a3ffbb';
  const popularMoviesUrl = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`;
  const searchPeopleUrl = 'https://api.themoviedb.org/3/search/multi';
  //const popular1MoviesUrl= 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

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

  useEffect(() => {
    getPopularMovies();
  }, []); 

  return (
    <BrowserRouter>
    <div className="App">
      {/* Logo */}
      <Logo />

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by actor or movie name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          
        />
        <button onClick={() => handleSearch()}>Search</button>
      </div>
    {/* Navigation Buttons */}
    <div className="NavigationButtons">
          <NavigationButton icon={faStar} to="/top-rated" />
          <NavigationButton icon={faFilm} to="/popular" />
          <NavigationButton icon={faTv} to="/upcoming" />
          <NavigationButton icon={faPlay} to="/now-playing" />
        </div>

        {/* Routes */}
        
        <Routes>
          <Route path="/popular" element={<Popular/>} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/now-playing" element={<Nowplaying />} />
          </Routes>
        
        

        

      {/* Movie List */}
      <main className="main">
        {movies &&
          movies.length > 0 &&
          movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
      </main>

    </div>
    </BrowserRouter>
  );
}

export default App;











