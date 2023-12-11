
import React, { useState, useEffect } from 'react';
import './user_prefrences.css';
import axios from 'axios';

const UserPreferences = ({ userId }) => {
  const [newsPreference, setNewsPreference] = useState(false);
  const [moviesPreference, setMoviesPreference] = useState(false);
  const [reviewsPreference, setReviewsPreference] = useState(false);
  const [tvPreference, setTvPreference] = useState(false);

  const handleSavePreferences = async () => {
    console.log(userId);
    const requestBody = {
      userId,
      newsPreference,
      moviesPreference,
      reviewsPreference,
      tvPreference,
    };

    console.log('Request Body:', requestBody);

    try {
        
      const response = await axios.post('http://localhost:5000/api/user-preferences', requestBody);
      console.log('Preferences saved:', response.data);
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        console.log('Fetching preferences...');
        const response = await axios.get(`http://localhost:5000/api/user-preferences/${userId}`);
        const preferences = response.data;
        console.log('Fetched Preferences:', preferences);

        setNewsPreference(preferences.news_preference);
        setMoviesPreference(preferences.movies_preference);
        setReviewsPreference(preferences.reviews_preference);
        setTvPreference(preferences.tv_preference);
      } catch (error) {
        console.error('Error fetching preferences:', error);
      }
    };

    fetchPreferences();
  }, [userId]);

  return (
    <div className="user-preferences-container">
      <h1 className="user-preferences-heading">User Preferences</h1>
      <h2 className="user-preferences-h2">Choose what you want to see in your homepage!</h2>

      <label className="preference-label">
        <input type="checkbox" className="preference-checkbox" checked={newsPreference} onChange={() => setNewsPreference(!newsPreference)} />
        News
      </label>

      <label className="preference-label">
        <input type="checkbox" className="preference-checkbox" checked={moviesPreference} onChange={() => setMoviesPreference(!moviesPreference)} />
        Movies
      </label>

      <label className="preference-label">
        <input type="checkbox" className="preference-checkbox" checked={reviewsPreference} onChange={() => setReviewsPreference(!reviewsPreference)} />
        Reviews
      </label>

      <label className="preference-label">
        <input type="checkbox" className="preference-checkbox" checked={tvPreference} onChange={() => setTvPreference(!tvPreference)} />
        TV Shows
      </label>

      <button className="save-preferences-button" onClick={handleSavePreferences}>
        Save Preferences
      </button>
    </div>
  );
};

export default UserPreferences;

