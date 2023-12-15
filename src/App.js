
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import '@fontsource/poppins';
import NavigationButtons from './navigationbuttons/NavigationButton';
import Login from './login+register/login'; 
import Popular from './pages/popular';
import Upcoming from './pages/upcoming';
import TopRated from './pages/toprated';
import TopBar from './TopBar';  
import PopularTv from './pages/populartv';
import TopratedTv from './pages/topratedtv';
import TrendingTv from './pages/trendingtv';
import FinnkinoNewsComponent from './pages/news';
import ContactUs from './contactUs';
import ReviewBrowser from './pages/reviews/reviewspage';
import FavsBrowser from './pages/reviews/tvfavorites';
import Register from './login+register/register';
import HomePage from './homepage';
import MovieDetailsPage from './pages/reviews/movieOverview';
import UserPreferences from './customize/user_preferences';
import CustomizedPage from './customize/customizedpage';
import User from './marietan/user';
import SharedPage from './customize/sharedpage';
import Footer from './marietan/footer';
import Groups from './marietan/groups';
import Makenew from './marietan/makeanew';

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
            <Route path="/share/:link" element={<SharedPage />} />
            
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
                      <Route path="/homepage" element={<HomePage userId={user?.userId} />} />
                      <Route path="/movie-overview/:movieId" element={<MovieDetailsPage />} />
                      <Route path="/preferences" element={<UserPreferences userId={user?.userId} />} />
                      <Route path="/customized/:userId" element={<CustomizedPage userId={user?.userId} />}/>
                      <Route path="/account" element={<User userId={user?.userId} username={user?.username} onLogout={handleLogout}/>}/>
                      <Route path="/groups" element={<Groups userId={user?.userId} />}/>
                      <Route path="/groups/makeanew" element={<Makenew userId={user?.userId} username={user?.username} />}/>
                    </Routes>
                  </div>
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
          </Routes>
        </div>
         <Footer user={user} onLogout={handleLogout} />
      </div>
    </BrowserRouter>
  );
}

export default App;
