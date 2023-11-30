import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from "axios";
import '@fontsource/poppins';
import NavigationButton from './NavigationButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faTv, faStar, faPlay } from '@fortawesome/free-solid-svg-icons';
import Popular from './pages/popular';
import Nowplaying from './pages/nowplaying';
import Upcoming from './pages/upcoming';
import TopRated from './pages/toprated';
import TopBar from './TopBar';  

function App() {
  const [movies, setMovies] = useState([]);
  const apiKey = 'a676d18cf85d5c37a91f273496a3ffbb';
  const popularMoviesUrl = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`;

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
    <BrowserRouter>
      <div className="App">
        {/* TopBar */}
        <TopBar />
        <div className="content">
        

        {/* Navigation Buttons */}
        <div className="NavigationButtons">
          <NavigationButton icon={faStar} to="/top-rated" />
          <NavigationButton icon={faFilm} to="/popular" />
          <NavigationButton icon={faTv} to="/upcoming" />
          <NavigationButton icon={faPlay} to="/now-playing" />
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/now-playing" element={<Nowplaying />} />
        </Routes>

      </div>
      </div>
    </BrowserRouter>
  );
}

export default App;







