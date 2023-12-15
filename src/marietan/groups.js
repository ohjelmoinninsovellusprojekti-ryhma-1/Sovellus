
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Popup3 from './popup3';
import './marietta.css';

export const Groups = ({ userId }) => {
  const [showMyGroupsPopup, setShowMyGroupsPopup] = useState(false);
  const [showAllGroupsPopup, setShowAllGroupsPopup] = useState(false);
  const [showPopularGroupsPopup, setShowPopularGroupsPopup] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [mostMembersGroups, setMostMembersGroups] = useState([]);
  const [myGroups, setMyGroups] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const navigate = useNavigate();
  const limit = 3; 

  const handleClosePopup = (setPopupState) => {
    console.log('Closing popup');
    setPopupState(false);
  };

  const handleChangeGroupname = async () => {
    const group_id = selectedGroupId;
    console.log('Initial group_id:', group_id);

    if (!group_id) {
      console.error('Invalid group or group ID');
      return;
    }

    const newGroupname = prompt('Enter new group name:');
    console.log( group_id);
    console.log(newGroupname);

    if (newGroupname) {
      try {
        const response = await axios.put(`http://localhost:5000/api/groups/${group_id}`, {
          name: newGroupname,
         
        });
        console.log('API Response:', response.data);
        if (response.status === 200) {
          console.log(`Group name changed to ${newGroupname}`);
        } else {
          console.error('Failed to change group name');
        }
      } catch (error) {
        console.error('Error updating group name:', error);
      }
    }
  };

  const handleDeleteGroup = async () => {
    const group_id = selectedGroupId;
    const confirmation = window.confirm('Are you sure you want to delete this group?');
    console.log(group_id);
    if (confirmation) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/delete-groups/${group_id}`);

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

  const handleMakeANewGroup = () => {
    navigate('/groups/makeanew');
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/groups/user/${userId}`)
    .then((response) => {
      setMyGroups(response.data);

      
      if (response.data.length === 1) {
        setSelectedGroupId(response.data[0].group_id);
      }

      console.log('API Response:', response.data);
    })
    .catch((error) => {
      console.error('Error fetching user groups:', error);
    });
 
 axios.get(`http://localhost:5000/api/groups/user/${userId}`)
    .then((response) => {
      setMyGroups(response.data);

 
      if (response.data.length === 1) {
        setSelectedGroupId(response.data[0].group_id);
      }

      console.log('API Response:', response.data);
    })
    .catch((error) => {
      console.error('Error fetching user groups:', error);
    });
    axios.get('http://localhost:5000/api/groups')
      .then((response) => {
        setAllGroups(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching all groups:', error);
      });
  }, [userId]);

  useEffect(() => {
    //const limit = 3; 
    axios.get(`http://localhost:5000/api/groups-most-members/${limit}`)
      .then((response) => {
        setMostMembersGroups(response.data);
        console.log('API Response (Groups with Most Members):', response.data);
      })
      .catch((error) => {
        console.error('Error fetching groups with most members:', error);
      });
  }, []); 

  return (
    <>
      <div className="groups-container">
        <h2>MOVIEHUB Community</h2>

        <div>
          <div className="groups-info">
            <label>My Groups:</label>
            <button
              className="glow-on-hover"
              type="button"
              onClick={() => setShowMyGroupsPopup(true)}
            >
              Show more
            </button>
            <Popup3
              title="My Groups"
              fetchFunction={() => `http://localhost:5000/api/groups/user/${userId}`}
              renderItem={(group) => (
                <span key={group.group_id}>{group.name}</span>
              )}
              onClose={() => setShowMyGroupsPopup(false)}
              showPopup={showMyGroupsPopup}
            />
          </div>
          <div>
            
            <div className="groups-info">
              <label>All Groups:</label>
              <button
                className="glow-on-hover"
                type="button"
                onClick={() => setShowAllGroupsPopup(true)}
              >
                Show more
              </button>
              <Popup3
                title="All Groups"
                fetchFunction={() => `http://localhost:5000/api/groups`}
                renderItem={(group) => (
                  <span key={group.group_id}>{group.name}</span>
                )}
                onClose={() => setShowAllGroupsPopup(false)}
                showPopup={showAllGroupsPopup}
              />
            </div>
            <div className="groups-info">
              <label>Popular Groups:</label>
              <button
                className="glow-on-hover"
                type="button"
                onClick={() => setShowPopularGroupsPopup(true)}
              >
                Show more
              </button>
              <Popup3
                title="Popular Groups"
                fetchFunction={() => `http://localhost:5000/api/groups-most-members/${limit}`}
                renderItem={(group) => (
                  <span key={group.group_id}>{group.name}</span>
                )}
                onClose={() => setShowPopularGroupsPopup(false)}
                showPopup={showPopularGroupsPopup}
              />
            </div>
          </div>
          

          <div className="groups-info">
            <div className="account-header">
              <label>Manage Groups</label>
            </div>
            <div className="account">
            <button
                className="glow-on-hover"
                type="button"
                onClick={handleMakeANewGroup}
              >
                Make a new
              </button>
              <button
                className="glow-on-hover"
                type="button"
                onClick={handleChangeGroupname}
              >
                Edit name
              </button>
              
              <button
                className="glow-on-hover"
                type="button"
                onClick={handleDeleteGroup}
              >
                Delete
              </button>
              {myGroups.length > 1 ? (
              <select
                onChange={(e) => setSelectedGroupId(e.target.value)}
                value={selectedGroupId}
              >
                <option value="" disabled>Select a group</option>
                {myGroups.map((group) => (
                  <option key={group.group_id} value={group.group_id}>
                    {group.name}
                  </option>
                ))}
              </select>
              ) : (
                <div>
                  <label>Selected Group:</label>
                  <span>{myGroups.length === 1 ? myGroups[0].name : 'No groups available'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Groups;



