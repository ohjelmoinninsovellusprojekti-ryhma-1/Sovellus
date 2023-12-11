
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './customizedpage.css';
import ReviewBrowser from '../pages/reviews/reviewspage';
import FinnkinoNewsComponent from '../pages/news';
import TopRated from '../pages/toprated';
import TopratedTv from '../pages/topratedtv';

const CustomizedPage = ({ userId }) => {
  const [userPreferences, setUserPreferences] = useState(null);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user-preferences/${userId}`);
        const preferences = response.data;
        
        
        setUserPreferences(preferences);
      } catch (error) {
        console.error('Error fetching preferences:', error);
      }
    };

    fetchPreferences();
  }, [userId]);

  if (!userPreferences) {

    return <div>Loading...</div>;
  }

  return (
    <div className="CustomizedPage">
      <h1>Welcome to Your Customized Page!</h1>
      <p>Based on your preferences, here's what you can see:</p>

      {userPreferences.news_preference && (
        <div className="CustomizedSection">
          <h2>News Section</h2>
          <FinnkinoNewsComponent />
        </div>
      )}

      {userPreferences.movies_preference && (
        <div className="CustomizedSection">
          <h2>Movies Section</h2>
          <TopRated />
        </div>
      )}

      {userPreferences.reviews_preference && (
        <div className="CustomizedSection">
          <h2>Reviews Section</h2>
          <ReviewBrowser />
        </div>
      )}

      {userPreferences.tv_preference && (
        <div className="CustomizedSection">
          <h2>TV Shows Section</h2>
          <TopratedTv />
        </div>
      )}
    </div>
  );
};

export default CustomizedPage;

