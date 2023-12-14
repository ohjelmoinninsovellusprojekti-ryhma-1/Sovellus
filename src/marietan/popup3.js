import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './marietta.css';

const Popup3 = ({ title, showPopup, onClose, fetchFunction, renderItem }) => {
  const [data, setData] = useState([]);
  

  useEffect(() => {
    if (showPopup) {
      axios.get(fetchFunction()).then((response) => {
        setData(response.data);
      });
    }
  }, [showPopup, fetchFunction]);

  return showPopup ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-header">
          <h2>{title}</h2>
          <button className="close" onClick={onClose}>
            X
          </button>
        </div>
        <div className="popup-content">
          {data.map((item) => renderItem(item))}
        </div>
      </div>
    </div>
  ) : null;
};

export default Popup3;