/*import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = ({ toggleIsMovies }) => {
  return (
    <div id="topbarBackground">
      <h1>MOVIEHUB</h1>
      <div className="topbarButtons">
        <Link to="/top-rated-movies" className="topbarButton" onClick={() => toggleIsMovies(true)}>
          <h3>Movies</h3>
        </Link>
        <Link to="/top-rated-tv" className="topbarButton" onClick={() => toggleIsMovies(false)}>
          <h3>TV-series</h3>
        </Link>
       
        <button className="topbarButton">
          <h3>Contact Us</h3>
        </button>
        <button className="topbarButton">
          <h3>Account</h3>
        </button>
      </div>
      <div className="bottomline"></div>
    </div>
  );
};

export default TopBar;*/
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopBar = ({ toggleIsMovies }) => {
  const navigate = useNavigate();

  const handleNavigation = (path, isMovies) => {
    toggleIsMovies(isMovies);
    navigate(path);
  };

  return (
    <div id="topbarBackground">
      <h1>MOVIEHUB</h1>
      <div className="topbarButtons">
        <button className="topbarButton" onClick={() => handleNavigation('/top-rated-movies', true)}>
          <h3>Movies</h3>
        </button>
        <button className="topbarButton" onClick={() => handleNavigation('/top-rated-tv', false)}>
          <h3>TV-series</h3>
        </button>
       
        <button className="topbarButton">
          <h3>Contact Us</h3>
        </button>
        <button className="topbarButton">
          <h3>Account</h3>
        </button>
      </div>
      <div className="bottomline"></div>
    </div>
  );
};

export default TopBar;



