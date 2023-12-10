/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../reviewBrowser.css';
import { useNavigate } from 'react-router-dom';

const FavsBrowser = () => {
  const [favorites, setFavorites] = useState([]);
  const [tvDetails, setTvDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data-fav');
        setFavorites(response.data);

        // Extract TV IDs from favorites
        const tvIds = response.data.map((fav) => fav.movie_id); // Assuming TV IDs are stored in the 'movie_id' field

        // Fetch TV details for each TV ID
        const details = {};
        for (const tvId of tvIds) {
          const tvResponse = await axios.get(`https://api.themoviedb.org/3/tv/${tvId}`, {
            params: {
              api_key: 'a676d18cf85d5c37a91f273496a3ffbb', // Replace with your TMDB API key
            },
          });
          details[tvId] = tvResponse.data;
        }

        setTvDetails(details);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);
  const handleReturnClick = () => {
    // Navigate back to the previous page
    navigate(-1);
  };

  return (
    <div className="favs-browser">
      <h1>Random User Favorite TV-shows!</h1>
      <div className="returnBtn">
        <button onClick={handleReturnClick}>&larr; Return</button>
      </div>
      <div className="favorites-container">
        {favorites
          .filter((fav) => fav.username) // Filter only favorites with a username
          .map((fav) => (
            <div key={fav.favorite_id} className="fav-item">
              <img
                className="poster-image"
                src={`https://image.tmdb.org/t/p/w500${tvDetails[fav.movie_id]?.poster_path}`}
                alt={`Poster for ${tvDetails[fav.movie_id]?.name}`}
              />
              <div className="poster-details">
                <div className="name">
                  <p>{tvDetails[fav.movie_id]?.name}</p>
                </div>
                <div className="username">
                  <p>{fav.username}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
  
};

export default FavsBrowser;
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../reviewBrowser.css';
import { useNavigate } from 'react-router-dom';

const FavsBrowser = () => {
  const [favorites, setFavorites] = useState([]);
  const [tvDetails, setTvDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data-fav');
        setFavorites(response.data);

        // Fetch details for each favorite item
        const details = {};
        for (const fav of response.data) {
          try {
            const endpoint = fav.is_movie ? 'movie' : 'tv';
            const mediaResponse = await axios.get(
              `https://api.themoviedb.org/3/${endpoint}/${fav.movie_id}`,
              {
                params: {
                  api_key: 'a676d18cf85d5c37a91f273496a3ffbb', // Replace with your TMDB API key
                },
              }
            );
            details[fav.movie_id] = mediaResponse.data;
          } catch (error) {
            console.error(`Error fetching details for ID ${fav.movie_id}:`, error);
          }
        }

        setTvDetails(details);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  const handleReturnClick = () => {
    // Navigate back to the previous page
    navigate(-1);
  };

  return (
    <div className="favs-browser">
      <h1>Random User Favorite TV-shows!</h1>
      <div className="returnBtn">
        <button onClick={handleReturnClick}>&larr; Return</button>
      </div>
      <div className="favorites-container">
        {favorites
          .filter((fav) => fav.username) // Filter only favorites with a username
          .map((fav) => (
            <div key={fav.favorite_id} className="fav-item">
              <img
                className="poster-image"
                src={`https://image.tmdb.org/t/p/w500${tvDetails[fav.movie_id]?.poster_path}`}
                alt={`Poster for ${tvDetails[fav.movie_id]?.name}`}
              />
              <div className="poster-details">
                <div className="name">
                  <p>{tvDetails[fav.movie_id]?.name}</p>
                </div>
                <div className="username">
                  <p>{fav.username}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FavsBrowser;



