import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '@fontsource/poppins';
//import './pages/popular.css';
//import './pages/ReviewPopup.css'; nämä muuttaa sivuston css
import NavigationButtons from './NavigationButton.js';
import Popular from './pages/popular.js';
import Nowplaying from './pages/nowplaying.js';
import Login from "./login.jsx";
import Upcoming from './pages/upcoming.js';
import TopRated from './pages/toprated.js';
import PopularTv from './pages/populartv.js';
import TopratedTv from './pages/topratedtv.js';
import TrendingTv from './pages/trendingtv.js';
import GenreTv from './pages/genretv.js';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar.js';
//import ContactUs from './contactUs';


const Movies = () => {
  const navigate = useNavigate();

  const handleMoviesButton = () => {
    navigate('/movies/top-rated-movies')
}
 
const handleSeriesButton = () => {
    navigate('/series/trending-tv')
}
/* const [user, setUser] = useState(null);
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
*/

return (
      <div className="?">
        <TopBar />
        <div className="content">
         { /*{user ? (
            <div>            
         {isMoviesOrTvSeriesPage && <NavigationButtons isMovies={isMovies} />} */}
               <Routes>
                <Route path="/popular-tv" element={<PopularTv /*userId={user.userId} username={user.username}*/ />} />
                <Route path="/top-rated-tv" element={<TopratedTv /* userId={user.userId} username={user.username}*/ />} />
                <Route path="/trending-tv" element={<TrendingTv /*userId={user.userId} username={user.username}*/ />} />
                <Route path="/genre-tv" element={<GenreTv /*userId={user.userId} username={user.username}*//>} />
             {/*   <Route path="/contact-us" element={<ContactUs />} />*/}
               </Routes>
            </div>
            { /*   ) : (
            <Login onLogin={handleLogin} />
          )}
        </div>*/}
      </div> 
  );
}

export default Movies;
