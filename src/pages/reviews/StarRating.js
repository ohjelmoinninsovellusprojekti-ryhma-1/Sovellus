
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar, faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const StarRating = ({ userId, movie, username }) => { 
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  const handleStarClick = async (value) => {
    setRating(value === rating ? 0 : value); 
    setHasRated(true);
    sendRatingToDatabase(value);
  };

  const sendRatingToDatabase = async (value) => {
    try {

      const response = await axios.post('http://localhost:5000/api/add-rating', {
        userId: userId, 
        movieId: movie.id, 
        rating: value,
        username: username
      });
      

      if (response.data.success) {
        console.log(`Rating sent to database: ${value}`);
      } else {
        console.error('Failed to send rating to the database');
      }
    } catch (error) {
      console.error('Error sending rating to the database', error);
    }
  };
  

  return (
    <div className="star-rating">
      {[5, 4, 3, 2, 1].map((value) => (
        <FontAwesomeIcon
        key={value}
        icon={value <= rating ? fasStar : farStar}
        className={`star ${value <= rating ? 'active' : ''}`}
        onClick={() => handleStarClick(value)}
      />
    ))}
    {hasRated && <p>You gave {rating} stars!</p>}
    </div>
  );
};

export default StarRating;

