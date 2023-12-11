
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ReviewPopup.css';
import { useNavigate } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const apiKey = 'a676d18cf85d5c37a91f273496a3ffbb';
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Movie ID before useEffect:', movieId);

    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            params: {
              api_key: apiKey,
              language: 'en-US',
            },
          }
        );

        if (response.data) {
          setMovieDetails(response.data);
        } else {
          console.error('Failed to fetch movie details');
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    console.log('Movie ID before fetching:', movieId);

    fetchMovieDetails();
  }, [movieId]);
  const handleReturnClick = () => {

    navigate(-1);
  };


  return (
    <div className="movie-details-container">
      {movieDetails && (
        <>
          <div className="movie-poster-container">
            <img
              className="movie-poster"
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt="Movie Poster"
            />
          </div>
          <div className="movie-overview-container">
            <h2 className="movie-title1">{movieDetails.title}</h2>
            <p className="movie-overview">{movieDetails.overview}</p>
            <p className="movie-rating">Rating: {movieDetails.vote_average}</p>
            <p className="movie-release-year">Release Year: {movieDetails.release_date && movieDetails.release_date.slice(0, 4)}</p>
            <p className="movie-genres">Genres: {movieDetails.genres.map((genre) => genre.name).join(', ')}</p>
            <p className="movie-homepage">{movieDetails.homepage}</p>
            <button className="returnBtn2" onClick={handleReturnClick}>&larr; Return</button>
          </div>
          
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;

