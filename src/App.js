
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import '@fontsource/poppins';
import NavigationButtons from './NavigationButton';
import Login from './login'; 
import Popular from './pages/popular';
import Upcoming from './pages/upcoming';
import TopRated from './pages/toprated';
import TopBar from './TopBar';  
import PopularTv from './pages/populartv';
import TopratedTv from './pages/topratedtv';
import TrendingTv from './pages/trendingtv';
import FinnkinoNewsComponent from './pages/news';
import ContactUs from './contactUs';
import ReviewBrowser from './pages/reviewspage';
import FavsBrowser from './pages/tvfavorites';
import Register from './register';
import HomePage from './homepage';
import MovieDetailsPage from './pages/movieOverview';

function App() {
  const [user, setUser] = useState(null);
  const [isMovies, setIsMovies] = useState(false);

  const toggleIsMovies = (newValue) => {
    console.log('Toggling isMovies to:', newValue);
    setIsMovies(newValue);
  };

  const handleLogin = (loggedInUser) => {
    console.log('User logged in:', loggedInUser);
    setUser(loggedInUser);
  };
  const handleLogout = () => {
   
    setUser(null);
  };

  useEffect(() => {
    console.log('UserId in App component:', user?.userId);
    console.log('Username in App component:', user?.username);
  }, [user]);

  const isMoviesOrTvSeriesPage = window.location.pathname.includes('movies') || window.location.pathname.includes('tv');

  return (
    <BrowserRouter>
      <div className="App">
      {user && <TopBar user={user} toggleIsMovies={toggleIsMovies} onLogout={handleLogout} />}       
        <div className="content">
          <Routes>
          
            <Route path="/browse-reviews" element={<ReviewBrowser />} username={user?.username} />
            <Route path="/favs" element={<FavsBrowser />} username={user?.username} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/*"
              element={
                user ? (
                  <div>
                    {isMoviesOrTvSeriesPage && <NavigationButtons isMovies={isMovies} />}
                    <Routes>
                      <Route path="/top-rated-movies" element={<TopRated userId={user?.userId} username={user?.username} />} />
                      <Route path="/popular-movies" element={<Popular userId={user?.userId} username={user?.username} />} />
                      <Route path="/upcoming-movies" element={<Upcoming userId={user?.userId} username={user?.username} />} />
                      <Route path="/news" element={<FinnkinoNewsComponent />} />
                      <Route path="/popular-tv" element={<PopularTv userId={user?.userId} username={user?.username} />} />
                      <Route path="/top-rated-tv" element={<TopratedTv userId={user?.userId} username={user?.username} />} />
                      <Route path="/trending-tv" element={<TrendingTv userId={user?.userId} username={user?.username} />} />
                      <Route path="/news" element={<FinnkinoNewsComponent />} />
                      <Route path="/contact-us" element={<ContactUs />} />
                      <Route path="/homepage" element={<HomePage />} />
                      <Route path="/movie-overview/:movieId" element={<MovieDetailsPage />} />

                    </Routes>
                  </div>
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
