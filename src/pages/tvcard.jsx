
import React, { useState } from 'react';
import './popular.css';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import StarRating from './reviews/StarRating';
import ReviewPopup from './reviews/reviewPopUp';


const TvCard = ({ movie, userId, username }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const handleAddReviewClick = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };


  const handleAddToFavorites = async () => {
    console.log('UserId before axios.post:', userId);
   
    try {
      console.log('Add to favorites request payload:', {
        userId: userId,
        movieId: movie.id,
        title: movie.title || movie.name,
        releaseYear: movie.release_date || movie.first_air_date,
        username: username,
      });
     

      const response = await axios.post('http://localhost:5000/api/add-to-favorites', {
        userId: userId,
        movieId: movie.id,
        title: movie.title || movie.name,
        releaseYear: movie.release_date || movie.first_air_date,
        username: username,
      });
      if (response.data.success) {
        setIsFavorite(true);
        console.log('Added to favorites:', response.data);
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      
    }
  };


  return (
    <div className="card-container">
      <div className="card-img-container">
        {movie.poster_path && (
          <img
            className="card-img"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt="movie-poster"
          />
        )}
      </div>
      <div className="overlay">
        <h2>{movie.name}</h2>
        <div className="overview-container">
          <p className="overview">{movie.overview}</p>
        </div>
        
        <div className="Ratings">
          <p>Rating: {movie.vote_average}</p>
          <p>First aired: {movie.first_air_date}</p>
        </div>
        <button className="addToFavoritesBtn" onClick={handleAddToFavorites} disabled={isFavorite}>
          <FontAwesomeIcon icon={faHeart} />
          {isFavorite ? ' Yay!' : 'Love this?'}
        </button>
        <div className="star">
      <StarRating userId={userId} movie={movie} username={username}/>
    </div>
    <button className="reviewBtn" onClick={handleAddReviewClick}>
        Add a more in detail review!
      </button>

      {isPopupVisible && <ReviewPopup onClose={handleClosePopup} movie={movie} username={username} userId={userId} />}
     
      </div>
    </div>
  );
};

export default TvCard;