import React from 'react';
import './popular.css';

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
      </div>
    </div>
  );
};

