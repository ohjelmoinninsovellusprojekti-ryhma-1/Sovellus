
import React from 'react';
import './marietta.css';
import { useNavigate } from 'react-router-dom';

const Footer = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="footer-container">
      <div className="footer-content">
        <p>&copy; 2023 MOVIEHUB ENTERTAINMENT</p>
        <p>All rights reserved.</p>
        {user && (
          <button type="button" onClick={handleLogout} className="logout-button">
            Log Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Footer;
