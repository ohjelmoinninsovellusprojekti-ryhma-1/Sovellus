
  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import './marietta.css';
  
  const Popup = ({ title, showPopup, onClose, fetchFunction, renderItem }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleClose = () => {
      setData([]); 
      onClose(); 
    };
  
    useEffect(() => {
      const fetchData = async () => {
        if (showPopup) {
          setIsLoading(true);
  
          try {
            const response = await axios.get(fetchFunction());
  
            if (response.data) {
              const movieIds = response.data.map((favorite) => favorite.movie_id);
              const moviesWithDetails = await fetchMovieDetails(movieIds);
  
              if (moviesWithDetails !== null) {
                setData(moviesWithDetails);
              } else {
                setError(new Error('Error fetching movie details'));
              }
            }
          } catch (error) {
            setError(error);
          } finally {
            setIsLoading(false);
          }
        }
      };
  
      fetchData();
    }, [showPopup, fetchFunction]);

  const fetchMovieDetails = async (movieIds) => {
    try {
      const apiKey = 'a676d18cf85d5c37a91f273496a3ffbb';
      console.log('Fetching movie details for movieIds:', movieIds);

      const movieDetailsPromises = movieIds.map(async (movieId) => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
          params: {         
            api_key: apiKey,
          },
        });
        console.log('MovieDB API response:', response.data);
        const movieDetails = response.data;

        if (movieDetails.title && movieDetails.poster_path) {
          return {
            title: movieDetails.title,
            overview: movieDetails.overview,
            poster: `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`,
            type: movieDetails.media_type || 'movie', 
          };
        } else {
          throw new Error('Invalid movie details received');
        }
      });

      const moviesWithDetails = await Promise.all(movieDetailsPromises);

      return moviesWithDetails;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  };
  if (!showPopup) {
    return null;
  }

  return (
    <div className={`popup ${showPopup ? 'show' : ''}`}>
      <div className="popup-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h3>{title}</h3>

        {isLoading && <p>Loading...</p>}

        {error && <p>Error: {error.message}</p>}

        {!isLoading && !error && (
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                <p>{item.title}</p>
                <img src={item.poster} alt={item.title} />
                
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Popup;

  