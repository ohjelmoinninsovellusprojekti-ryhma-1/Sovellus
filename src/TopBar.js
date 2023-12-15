
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './milla.css';

const TopBar = ({ user, toggleIsMovies, onLogout }) => {
  const navigate = useNavigate();

  const handleNavigation = (path, isMovies) => {
    toggleIsMovies(isMovies);
    navigate(path);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div id="topbarBackground">
      <div className="moviehublogin">
        <h1>MOVIEHUB</h1>
      </div>
      <div className="topbarButtons">
        <button className="topbarButton" onClick={() => handleNavigation('/homepage')}>
          <h3 className="btn3">Homepage</h3>
        </button>
        <button className="topbarButton" onClick={() => handleNavigation('/customized/:userId')}>
          <h3>Customized page</h3>
        </button>
        <button className="topbarButton" onClick={() => handleNavigation('/top-rated-movies', true)}>
          <h3>Movies</h3>
        </button>
        <button className="topbarButton" onClick={() => handleNavigation('/top-rated-tv', false)}>
          <h3>TV-series</h3>
        </button>
        <button className="topbarButton" onClick={() => handleNavigation('/browse-reviews')}>
          <h3>Movie Reviews</h3>
        </button>
        <button className="topbarButton" onClick={() => handleNavigation('/contact-us')}>
          <h3>Contact Us</h3>
        </button>
        <button className="topbarButton" onClick={() => handleNavigation('/groups')}>
          <h3>Groups</h3>
        </button>
        <button className="topbarButton" onClick={() => handleNavigation('/account')}>
          <h3>Account</h3>
        </button>
        {user && (
          <button className="topbarButton" onClick={handleLogout}>
            <h3>Logout</h3>
          </button>
          
        )}
      </div>
      <div className="bottomline"></div>
    </div>
  );
};

TopBar.propTypes = {
  user: PropTypes.object,
  toggleIsMovies: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default TopBar;




