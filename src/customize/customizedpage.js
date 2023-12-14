
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './customizedpage.css';
import ReviewBrowser from '../pages/reviews/reviewspage';
import FinnkinoNewsComponent from '../pages/news';
import TopRated from '../pages/toprated';
import TopratedTv from '../pages/topratedtv';

const CustomizedPage = ({ userId }) => {
  const { link } = useParams();
  const [userPreferences, setUserPreferences] = useState(null);
  const [shareableLink, setShareableLink] = useState(null);
  const [preferencesFetched, setPreferencesFetched] = useState(false);

  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        console.log('userId:', userId);


        if (link) {
          const response = await axios.get(`http://localhost:5000/share/${link}`);
          const preferences = response.data.userPreferences;
          setUserPreferences(preferences);
          setPreferencesFetched(true); 
        } else if (userId) {
          
          const parsedUserId = parseInt(userId);

          if (!isNaN(parsedUserId)) {
            const response = await axios.get(`http://localhost:5000/api/user-preferences/${parsedUserId}`);
            const preferences = response.data;
            setUserPreferences(preferences);
            setPreferencesFetched(true); 
          } else {
            console.error('Invalid userId:', userId);
          }
        }
      } catch (error) {
        console.error('Error fetching preferences:', error);
      }
    };

    const generateShareableLink = async () => {
      try {
        if (userId && preferencesFetched) {
          
          const parsedUserId = parseInt(userId);

          if (!isNaN(parsedUserId)) {
            const linkResponse = await axios.post('http://localhost:5000/api/generate-link', {
              userId: parsedUserId,
              
            });
            const generatedLink = linkResponse.data.link;
            setShareableLink(generatedLink);

            console.log('Generated Shareable Link:', generatedLink);
          } else {
            console.error('Invalid userId:', userId);
          }
        }
      } catch (error) {
        console.error('Error generating shareable link:', error);
      }
    };

    fetchUserPreferences();
    generateShareableLink();
  }, [userId, link, preferencesFetched]);

  if (!userPreferences) {
    return <div>Loading...</div>;
  }
  return (
    <div className="CustomizedPageh">
      <h1>Welcome to Your Customized Page!</h1>
      
      <div className="CustomizedPage">
        {userPreferences.news_preference && (
          <div className="CustomizedSection">
            <h2>News Section</h2>
            <FinnkinoNewsComponent />
          </div>
        )}

        {userPreferences.movies_preference && (
          <div className="CustomizedSection">
            <h2>Movies Section</h2>
            <TopRated />
          </div>
        )}

        {userPreferences.reviews_preference && (
          <div className="CustomizedSection">
            <h2>Reviews Section</h2>
            <ReviewBrowser />
          </div>
        )}

        {userPreferences.tv_preference && (
          <div className="CustomizedSection">
            <h2>TV Shows Section</h2>
            <TopratedTv />
          </div>
        )}
        {shareableLink && (
        <div>
          <p>Share your page with friends!:</p>
          <p className="shlink">{`http://localhost:3000/share/${shareableLink}`}</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default CustomizedPage;



