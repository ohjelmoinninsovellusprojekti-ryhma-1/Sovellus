import React from 'react';
import TopBar from '../components/topbar.js';
import '../App.css'; 

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        {/* Add your footer content here */}
        <p>&copy; 2023 MOVIEHUB ENTERTAINMENT</p>
        <p>All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;