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
import ContactUs from './contactUs';


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
    console.log('Username in App component:', user?.username);
  }, [user]);

  const isMoviesOrTvSeriesPage = window.location.pathname.includes('movies') || window.location.pathname.includes('tv');

  return (
    <BrowserRouter>
      <div className="App">
        <TopBar user={user} toggleIsMovies={toggleIsMovies} />
        <div className="content">
          {user ? (
            <div>            
              {isMoviesOrTvSeriesPage && <NavigationButtons isMovies={isMovies} />}
              <Routes>
                <Route path="/top-rated-movies" element={<TopRated userId={user.userId} username={user.username} />} />
                <Route path="/popular-movies" element={<Popular userId={user.userId} username={user.username} />} />
                <Route path="/upcoming-movies" element={<Upcoming userId={user.userId} username={user.username} />} />
                <Route path="/now-playing-movies" element={<Nowplaying userId={user.userId} username={user.username} />} />
                <Route path="/popular-tv" element={<PopularTv userId={user.userId} username={user.username} />} />
                <Route path="/top-rated-tv" element={<TopratedTv userId={user.userId} username={user.username} />} />
                <Route path="/trending-tv" element={<TrendingTv userId={user.userId} username={user.username} />} />
                <Route path="/genre-tv" element={<GenreTv userId={user.userId} username={user.username} />} />
                <Route path="/contact-us" element={<ContactUs />} />
            
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
