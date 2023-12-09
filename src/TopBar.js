import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const TopBar = ({ toggleIsMovies }) => {
  const navigate = useNavigate();

  /*const handleNavigation = (path, isMovies) => {
    toggleIsMovies(isMovies);
    navigate(path);
  };
*/
  const handleMoviesButton = () => {
    navigate('/movies/top-rated-movies')
}

  const handleSeriesButton = () => {
    navigate('/series/trending-tv')
}

const handleHomeButton = () => {
  navigate('/home')
}

const handleContactButton = () => {
  navigate('/contact-us')
}


  return (
    <div>
    <div id="topbarBackground">
      <h1>MOVIEHUB</h1>
      <div className="topbarButtons">
           <Button className = "Home" onClick={handleHomeButton}><h3>Home</h3></Button>
           <Button className = "Movies" onClick={handleMoviesButton}><h3>Movies</h3></Button>
           <Button  className = "Series" onClick={handleSeriesButton}> <h3>Series</h3></Button>
           <Button className="contactUs" onClick={handleContactButton}> <h3>Contact Us</h3> </Button>
        <button className="topbarButton"> <h3>Account</h3></button>
      </div>
      <div className="bottomline"></div>
    </div>
    </div>
  );
};

export default TopBar;





