import React, { useState } from 'react';
import TopBar from '../components/topbar.js';
import '../App.css';

const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="footer-container">
      <div className="footer-content">
        <p>&copy; 2023 MOVIEHUB ENTERTAINMENT</p>
        <p>All rights reserved.</p>
        {isLoggedIn ? (
          <button type="button" onClick={handleLogOut} className="logout-button">
            Log Out
          </button>
        ) : (
          <button className="logout-button">Sign In</button>
        )}
      </div>
    </div>
  );
};

export default Footer;