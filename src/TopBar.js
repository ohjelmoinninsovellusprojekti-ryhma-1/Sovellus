
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopBar = ({ toggleIsMovies }) => {
  const navigate = useNavigate();

  const handleNavigation = (path, isMovies) => {
    toggleIsMovies(isMovies);
    navigate(path);
  };

  const handleHomeNavigation = (path, home) => {
    navigate(path);
  }

  return (
    <div id="topbarBackground">
      <h1>MOVIEHUB</h1>
      <div className="topbarButtons">
        <button className = "Home" onClick= {() => handleHomeNavigation('/homepage', true)}><h3>Home</h3></button>
        <button className="topbarButton" onClick={() => handleNavigation('/popular-movies', true)}>
          <h3>Movies</h3>
        </button>
        <button className="topbarButton" onClick={() => handleNavigation('/top-rated-tv', false)}>
          <h3>TV-series</h3>
        </button>
       
        <button className="topbarButton" onClick={() => handleNavigation('/contact-us')}>
          <h3>Contact Us</h3>
        </button>
        <button className="topbarButton" onClick={() => handleNavigation('/browse-reviews')}>
          <h3>Account</h3>
        </button>
      </div>
      <div className="bottomline"></div>
    </div>
  );
};

export default TopBar;



