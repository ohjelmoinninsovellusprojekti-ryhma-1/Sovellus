
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@fontsource/poppins';
import NavigationButtons from './NavigationButton';
import Login from './login'; 

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
  const [user, setUser] = useState(null);
  const [isMovies, setIsMovies] = useState(true);

  const toggleIsMovies = (newValue) => {
    console.log('Toggling isMovies to:', newValue)
    setIsMovies(newValue);
  };
  const handleLogin = (loggedInUser) => {
    console.log('User logged in:', loggedInUser);
    setUser(loggedInUser);
  };
  useEffect(() => {
    console.log('UserId in App component:', user?.userId);
  }, [user]);

   return (
    <BrowserRouter>
      <div className="App">
      
        <TopBar user={user} toggleIsMovies={toggleIsMovies} />
        <div className="content">
        {user ? (
          <div>          
          
          <NavigationButtons isMovies={isMovies} />
        
          <Routes>
          
          <Route path="/top-rated-movies" element={<TopRated userId={user.userId} />} />
          <Route path="/popular-movies" element={<Popular userId={user.userId} />} />
          <Route path="/upcoming-movies" element={<Upcoming userId={user.userId} />} />
          <Route path="/now-playing-movies" element={<Nowplaying userId={user.userId} />} />
          <Route path="/popular-tv" element={<PopularTv userId={user.userId} />} />
          <Route path="/top-rated-tv" element={<TopratedTv userId={user.userId} />} />
          <Route path="/trending-tv" element={<TrendingTv userId={user.userId} />} />
         <Route path="/genre-tv" element={<GenreTv userId={user.userId} />} />
          </Routes>
        </div>
         ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

