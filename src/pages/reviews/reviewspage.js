
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './reviewBrowser.css';

import { useNavigate } from 'react-router-dom';

const ReviewBrowser = () => {
  const [reviews, setReviews] = useState([]);
  const [posterPaths, setPosterPaths] = useState({});
  const [movieTitles, setMovieTitles] = useState({});
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [isSorted, setIsSorted] = useState(false);
  const apiKey = 'a676d18cf85d5c37a91f273496a3ffbb';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewsResponse = await axios.get('http://localhost:5000/api/data');
        setReviews(reviewsResponse.data);

        const movieIds = [...new Set(reviewsResponse.data.map((review) => review.movie_id))];

        const paths = {};
        const titles = {};
        for (const movieId of movieIds) {
          const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            params: {                   
              api_key: apiKey,           
            },
          });
          paths[movieId] = movieResponse.data.poster_path;
          titles[movieId] = movieResponse.data.title;
          
        }

        setPosterPaths(paths);
        setMovieTitles(titles);
      } catch (error) {
        console.error('Error fetching data:', error);
        
      }
    };

    fetchData();
  }, []);

  const combinedReviews = reviews.reduce((acc, review) => {
    const existingReview = acc.find(
      (r) => r.movie_id === review.movie_id && r.user_id === review.user_id
    );

    if (existingReview) {
      existingReview.rating = existingReview.rating || review.rating;
      existingReview.review_text = existingReview.review_text || review.review_text;
    } else {
      acc.push({ ...review });
    }

    return acc;
  }, []);

  const handleFavsClick = () => {
    navigate('/favs');
  };

  const handleMoreClick = (movieId) => {
    navigate(`/movie-overview/${movieId}`);
  };

  const handleSortOrderChange = () => {
    setIsSorted((prevIsSorted) => !prevIsSorted);
  };

  const sortedReviews = isSorted
    ? [...combinedReviews].sort((a, b) => {
        const titleA = movieTitles[a.movie_id] || '';
        const titleB = movieTitles[b.movie_id] || '';

        return sortOrder === 'asc' ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
      })
    : combinedReviews;

    const handleReturnClick = () => {
    
      navigate(-1);
    };

  return (
    <div className="review-browser">
      <button className="retBtn1" onClick={handleReturnClick}>&larr; Return</button>
        
      <h1>
        Movie reviews from our other users{' '}
        <button className="sortBtn" onClick={handleSortOrderChange}>
          Sort results: {isSorted ? (sortOrder === 'asc' ? 'Random' : 'Z-A') : 'Alphabetical'}
        </button>
      </h1>
      <div className="favsBtn">
        <button className="favsBtn1" onClick={handleFavsClick}>
          Favourite TV
        </button>
        <p className="favs-description">Click above to see our users' favorited TV-Shows!</p>
      </div>
      
      <div className="reviews-container">
        {sortedReviews.map((review) => {
          const posterPath = posterPaths[review.movie_id];
          const posterUrl = posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : '';
          const movieTitle = movieTitles[review.movie_id] || 'Unknown Title';

          return (
            <div key={review.review_id} className="review-item">
              <div className="poster-container">
                {posterUrl && <img src={posterUrl} alt="Movie Poster" />}
                <p className="movie-title">{movieTitle}</p>
              </div>
              <button className="moreBtn" onClick={() => handleMoreClick(review.movie_id)}>
                more
              </button>
              <div className="review-content">
                <p className="username">{review.username} :</p>
                {review.rating && review.review_text && (
                  <p className="review-text">
                    Gave this {review.rating} stars - {review.review_text}
                  </p>
                )}
                {!review.rating && review.review_text && (
                  <p className="review-text">
                    Movie ID: {review.movie_id} - {review.review_text}
                  </p>
                )}
                {review.rating && !review.review_text && (
                  <p className="review-text">
                    Movie ID: {review.movie_id} - Gave this {review.rating} stars
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewBrowser;



