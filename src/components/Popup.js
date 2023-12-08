import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const Popup = ({ title, showPopup, onClose, fetchFunction, renderItem }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
  
        try {
          const response = await axios.get(fetchFunction());
  
          if (response.data) {
            setData(response.data);
          }
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };
  
      if (showPopup) {
        fetchData();
      }
    }, [showPopup, fetchFunction]);
  
    return (
      <div className={`popup ${showPopup ? 'show' : ''}`}>
      <div className="popup-content">
        <span className="close" onClick={() => onClose()}>&times;</span>
          <h3>{title} </h3>
  
          {isLoading && <p>Loading...</p>}
  
          {error && <p>Error: {error.message}</p>}
  
          {!isLoading && !error && (
            <ul>
              {data.map((item, index) => (
                <li key={index}>{renderItem(item)}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };
  
  export default Popup;
  