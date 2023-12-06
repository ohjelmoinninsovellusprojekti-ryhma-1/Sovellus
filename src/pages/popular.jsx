/*import React from 'react';
import './popular.css';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const PopularCard = ({ movie }) => {
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
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <div className="Ratings">
          <p>Rating: {movie.vote_average}</p>
          <p>Release Date: {movie.release_date}</p>
        </div>
        <button className="addToFavoritesBtn">
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import './popular.css';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const PopularCard = ({ movie, userId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToFavorites = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/add-to-favorites', {
        userId: userId,  // Pass the user ID from your authentication system
        movieId: movie.id,  // Assuming your movie object has an 'id' property
      });

      if (response.data.success) {
        setIsFavorite(true);
        // You can perform additional actions upon successful addition to favorites
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      // Handle errors here
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
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <div className="Ratings">
          <p>Rating: {movie.vote_average}</p>
          <p>Release Date: {movie.release_date}</p>
        </div>
        <button className="addToFavoritesBtn" onClick={handleAddToFavorites} disabled={isFavorite}>
          <FontAwesomeIcon icon={faHeart} />
          {isFavorite ? ' Favorited' : ' Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default PopularCard;*/
import React, { useState } from 'react';
import './popular.css';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';


const PopularCard = ({ movie, userId }) => {
  const [isFavorite, setIsFavorite] = useState(false);


  const handleAddToFavorites = async () => {
    console.log('UserId before axios.post:', userId);
   
    try {
      console.log('Add to favorites request payload:', {
        userId: userId,
        movieId: movie.id,
        title: movie.title || movie.name,
        releaseYear: movie.release_date || movie.first_air_date,
      });
     

      const response = await axios.post('http://localhost:5000/api/add-to-favorites', {
        userId: userId,
        movieId: movie.id,
        title: movie.title || movie.name,
        releaseYear: movie.release_date || movie.first_air_date,
      });
      if (response.data.success) {
        setIsFavorite(true);
        console.log('Added to favorites:', response.data);
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      // Handle errors here
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
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <div className="Ratings">
          <p>Rating: {movie.vote_average}</p>
          <p>Release Date: {movie.release_date}</p>
        </div>
        <button className="addToFavoritesBtn" onClick={handleAddToFavorites} disabled={isFavorite}>
          <FontAwesomeIcon icon={faHeart} />
          {isFavorite ? ' Favorited' : ' Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default PopularCard;




