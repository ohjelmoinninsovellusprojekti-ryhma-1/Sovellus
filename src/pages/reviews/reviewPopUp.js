
import React, { useState } from 'react';
import axios from 'axios'; 
import './ReviewPopup.css';


const ReviewPopup = ({ onClose, movie, username, userId }) => {
    console.log('ReviewPopup props:', { onClose, movie, username, userId });
    const [reviewText, setReviewText] = useState('');
  
    const handleSaveReview = async () => {
      try {

        console.log('movie_reviews?:', {
            username: username,
            movieId: movie.id,
            reviewText: reviewText,
            userId: userId
              
          });
        
      const response = await axios.post('http://localhost:5000/api/add-a-review', {
        movieId: movie.id,
        reviewText: reviewText,
        username: username,
        userId: userId
      });

      if (response.data.success) {
        console.log('Review saved successfully');
        onClose(reviewText);
      } else {
        console.error('Failed to save the review');
      }
    } catch (error) {
      console.error('Error saving review:', error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <textarea
          placeholder="Write your review here, max 1000 characters!..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <button className="save-review-button" onClick={handleSaveReview}>Save Review</button>
       
      </div>
    </div>
  );
};

export default ReviewPopup;

