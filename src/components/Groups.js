import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from '../components/Popup.js';
import '../App.css';
import TopBar from '../components/topbar.js';
import Footer from '../components/footer.js';

export const Groups = () => {
  const [showMyGroupsPopup, setShowMyGroupsPopup] = useState(false);
  const [showPopularGroupsPopup, setShowPopularGroupsPopup] = useState(false);
  const [showAllGroupsPopup, setShowAllGroupsPopup] = useState(false);

  const [myGroups, setMyGroups] = useState([
    { id: 1, name: 'Group 1' },
    { id: 2, name: 'Group 2' },
    { id: 3, name: 'Group 3' },
  ]);

  const [popularGroups, setPopularGroups] = useState([
    { id: 4, name: 'Popular Group 1' },
    { id: 5, name: 'Popular Group 2' },
    { id: 6, name: 'Popular Group 3' },
  ]);

  const [allGroups, setAllGroups] = useState([
    { id: 7, name: 'All Group 1' },
    { id: 8, name: 'All Group 2' },
    { id: 9, name: 'All Group 3' },
  ]);

  const handleClosePopup = (setPopupState) => {
    setPopupState(false);
  };

  return (
    <>
      <div className="groups-container">
        <h2>MOVIEHUB Community</h2>

        {/* My Groups List */}
        <div>
         <div className="groups-info"> 
          <label>My Groups:</label>
          <button class="glow-on-hover"
          type="button" onClick={() => setShowMyGroupsPopup(true)}>
            Show more
          </button>
          <Popup
            title="My Groups"
            showPopup={showMyGroupsPopup}
            onClose={() => handleClosePopup(setShowMyGroupsPopup)}
            fetchFunction={() => '/api/my-groups'} // Korvaa oikealla polulla
            renderItem={(group) => <span key={group.id}>{group.name}</span>}
          />
        </div>

        {/* Popular Groups List */}
        <div>
         <div className="groups-info"> 
          <label>Popular Groups:</label>
          <button class="glow-on-hover"
          type="button" onClick={() => setShowPopularGroupsPopup(true)}>
            Show more
          </button>
          <Popup
            title="Popular Groups"
            showPopup={showPopularGroupsPopup}
            onClose={() => handleClosePopup(setShowPopularGroupsPopup)}
            fetchFunction={() => '/api/popular-groups'} // Korvaa oikealla polulla
            renderItem={(group) => <span key={group.id}>{group.name}</span>}
          />
        </div>

        {/* All Groups List */}
        <div>
         <div className="groups-info"> 
          <label>All Groups:</label>
          <button class="glow-on-hover"
          type="button" onClick={() => setShowAllGroupsPopup(true)}>
            Show more
          </button>
          <Popup
            title="All Groups"
            showPopup={showAllGroupsPopup}
            onClose={() => handleClosePopup(setShowAllGroupsPopup)}
            fetchFunction={() => '/api/all-groups'} // Korvaa oikealla polulla
            renderItem={(group) => <span key={group.id}>{group.name}</span>}
          />
        </div>
      </div>
      </div>
      </div>  
      </div>  
      {/* TopBar/Footer component */}
      <TopBar />
      <Footer />
    </>
  );
};

export default Groups;