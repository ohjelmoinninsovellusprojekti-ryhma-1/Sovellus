import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Popup from '../components/Popup.js';
import '../App.css';
import TopBar from '../components/topbar.js';
import Footer from '../components/footer.js';

export const Groups = () => {
  const [showMyGroupsPopup, setShowMyGroupsPopup] = useState(false);
  const [showPopularGroupsPopup, setShowPopularGroupsPopup] = useState(false);
  const [showAllGroupsPopup, setShowAllGroupsPopup] = useState(false);

  const [myGroups, setMyGroups] = useState([]);
  const [popularGroups, setPopularGroups] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const navigate = useNavigate();

  const handleClosePopup = (setPopupState) => {
    setPopupState(false);
  };

  const handleChangeGroupname = async (groupId, newGroupName) => {
    const newGroupname = prompt('Enter new group name:');
    if (newGroupname) {
    try {
      const response = await axios.put(`http://localhost:3001/groups/${groupId}`, {
        name: newGroupName,
      });

      if (response.status === 200) {
        console.log(`Group name changed to ${newGroupName}`);
      } else {
        console.error('Failed to change group name');
      }
    } catch (error) {
      console.error('Error updating group name:', error);
    }
   }
  };

  // Jää ehkä vajaaksi tämän tarkoitus kun luotu makenew -toiminnallisuus
  // Jätän nyt kuitenkin tämän tähän jatko jalostusta varten
  const handleMakeNew = async (newGroupName) => {
    const confirmation = window.confirm('Are you sure you want to make new group');
    if (confirmation) {
    try {
      const response = await axios.post('http://localhost:3001/groups', {
        name: newGroupName,
      });

      if (response.status === 200) {
        console.log(`New group created with name ${newGroupName}`);
      } else {
        console.error('Failed to create new group');
      }
    } catch (error) {
      console.error('Error creating new group:', error);
    }
   }
  };

  const handleDeleteGroup = async (groupId) => {
    const confirmation = window.confirm('Are you sure you want to delete this group?');
    if (confirmation) {
      try {
        const response = await axios.delete(`http://localhost:3001/groups/${groupId}`);

        if (response.status === 200) {
          console.log('Group and data deleted successfully');
        } else {
          console.error('Failed to delete group, please try again or contact our customer service');
        }
      } catch (error) {
        console.error('Error deleting group:', error);
      }
    }
  };

  // Placeholder-ryhmän ID
  const placeholderGroupId = 1;

  useEffect(() => {
    // Hae käyttäjän ryhmät:
    axios.get('http://localhost:3001/groups')
      .then((response) => {
        setMyGroups(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user groups:', error);
      });

    // Hae suosituimmat ryhmät:
    axios.get('http://localhost:3001/groups/popular')
      .then((response) => {
        setPopularGroups(response.data);
      })
      .catch((error) => {
        console.error('Error fetching popular groups:', error);
      });

    // Hae kaikki ryhmät:
    axios.get('http://localhost:3001/groups/all')
      .then((response) => {
        setAllGroups(response.data);
      })
      .catch((error) => {
        console.error('Error fetching all groups:', error);
      });
  }, []);

  return (
    <>
      <div className="groups-container">
        <h2>MOVIEHUB Community</h2>

        {/* My Groups -lista */}
        <div>
          <div className="groups-info">
            <label>My Groups:</label>
            <button className="glow-on-hover" type="button" onClick={() => setShowMyGroupsPopup(true)}>
              Show more
            </button>
            <Popup
              title="My Groups"
              showPopup={showMyGroupsPopup}
              onClose={() => handleClosePopup(setShowMyGroupsPopup)}
              data={myGroups}
              renderItem={(group) => <span key={group.id}>{group.name}</span>}
            />
          </div>

          {/* Popular Groups -lista */}
          <div>
            <div className="groups-info">
              <label>Popular Groups:</label>
              <button className="glow-on-hover" type="button" onClick={() => setShowPopularGroupsPopup(true)}>
                Show more
              </button>
              <Popup
                title="Popular Groups"
                showPopup={showPopularGroupsPopup}
                onClose={() => handleClosePopup(setShowPopularGroupsPopup)}
                data={popularGroups}
                renderItem={(group) => <span key={group.id}>{group.name}</span>}
              />
            </div>

            {/* All Groups -lista */}
            <div>
              <div className="groups-info">
                <label>All Groups:</label>
                <button className="glow-on-hover" type="button" onClick={() => setShowAllGroupsPopup(true)}>
                  Show more
                </button>
                <Popup
                  title="All Groups"
                  showPopup={showAllGroupsPopup}
                  onClose={() => handleClosePopup(setShowAllGroupsPopup)}
                  data={allGroups}
                  renderItem={(group) => <span key={group.id}>{group.name}</span>}
                />
              </div>
            </div>

            {/* Manage Groups -kohta */}
            <div className="groups-info">
              <div className="account-header">
                <label>Manage Groups</label>
              </div>
              <div className="account">
                {/* Tässä kohtaa placeholder-ryhmä */}
                <button className="glow-on-hover" type="button" onClick={() => handleChangeGroupname(placeholderGroupId, 'New Name')}>
                  Edit name
                </button>
                <button className="glow-on-hover" type="button" onClick={() => navigate('/makenew')}>
                  Make a new
                </button>
                {/* Tässä kohtaa placeholder-ryhmä */}
                <button className="glow-on-hover" type="button" onClick={() => handleDeleteGroup(placeholderGroupId)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TopBar />
      <Footer />
    </>
  );
};

export default Groups;


