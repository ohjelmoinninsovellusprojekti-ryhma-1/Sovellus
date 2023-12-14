import React, { useEffect, useRef } from 'react';
import helpImage from '../img/nofriends.jpg';
import AkonLonely from '../audio/Akon - Lonely.mp3';

const Popup2 = ({ title, showPopup, onClose, link, linkText }) => {
    const audioRef = useRef(null);
  
    useEffect(() => {

        if (showPopup) {
          audioRef.current.play().catch(error => {

            console.error('Error playing audio:', error);
          });
        } else {

          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
        }

        return () => {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
        };
      }, [showPopup]);
  
    return (
      <div className={`popup ${showPopup ? 'active' : ''}`}>
        <div className="popup-content">
          <div className="popup-header">
            <h3 className="popup-title">{title}</h3>
            <span className="close" onClick={onClose}>
              &times;
            </span>
          </div>
          <div className="popup-body">
            {link && (
              <p>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {linkText}
                </a>
              </p>
            )}
            <p>You have no friends, sadface</p>

            <div>
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch this video to make friends!
              </a>
            </div>

            <div>
              <img src={helpImage} alt="Help Image" />
            </div>

            <audio ref={audioRef} controls>
              <source src={AkonLonely} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>
    );
  };
  
  export default Popup2;
