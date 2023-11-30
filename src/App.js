import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@fontsource/poppins';
import NavigationButtons from './NavigationButton';

import Popular from './pages/popular';
import Nowplaying from './pages/nowplaying';
import Upcoming from './pages/upcoming';
import TopRated from './pages/toprated';
import TopBar from './TopBar';  
import PopularTv from './pages/populartv';
import TopratedTv from './pages/topratedtv';
import TrendingTv from './pages/trendingtv';
import GenreTv from './pages/genretv';



function App() {
  const [isMovies, setIsMovies] = useState(true);

  const toggleIsMovies = (newValue) => {
    setIsMovies(newValue);
  };

  return (
    <BrowserRouter>
      <div className="App">
        {/* TopBar */}
        <TopBar toggleIsMovies={toggleIsMovies} />
        <div className="content">
          {/* Navigation Buttons */}
          <NavigationButtons isMovies={isMovies} />
          {/* Routes */}
          <Routes>
            <Route path="/top-rated-movies" element={<TopRated />} />
            <Route path="/popular-movies" element={<Popular />} />
            <Route path="/upcoming-movies" element={<Upcoming />} />
            <Route path="/now-playing-movies" element={<Nowplaying />} />
            <Route path="/popular-tv" element={<PopularTv />} />
            <Route path="/top-rated-tv" element={<TopratedTv />} />
            <Route path="/trending-tv" element={<TrendingTv />} />
            <Route path="/genre-tv" element={<GenreTv />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;