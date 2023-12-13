import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import TopBar from '../components/topbar.js';
import Footer from '../components/footer.js';
import Popup from '../components/Popup.js';

const Makenew = () => {
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [groupMembers, setGroupMembers] = useState([]);
    const [userId, setUserId] = useState('');
    const [newMember, setNewMember] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [showMembersPopup, setShowMembersPopup] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/user', {
            withCredentials: true,
          });
  
          if (response.data && response.data.user) {
            setUserId(response.data.user.id);
            setLoggedIn(true);
          } else {
            setLoggedIn(false);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setLoggedIn(false);
        }
      };
  
      fetchData();
    }, []);
  
    const handleLoginClick = () => {
      navigate('../');
    };
  
    const handleAddMember = () => {
      if (newMember.trim() !== '') {
        setGroupMembers([...groupMembers, newMember]);
        setNewMember('');
      }
    };
  
    const handleRemoveMember = (member) => {
      const updatedMembers = groupMembers.filter((m) => m !== member);
      setGroupMembers(updatedMembers);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!loggedIn) {
        console.error('User not logged in. Cannot create group.');
        return;
      }
  
      const groupData = {
        groupName,
        groupDescription,
        members: groupMembers,
        ownerId: userId,
      };
  
      try {
        const response = await axios.post(
          'http://localhost:5000/api/createGroup',
          groupData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (response.status === 200) {
          console.log('Group creation successful');
          navigate('../');
        } else {
          console.error('Group creation failed. Server returned:', response);
          throw new Error('Group creation failed');
        }
      } catch (error) {
        console.error('ERROR when sending post', error);
        console.error('Server response:', error.response);
      }
    };
  
    return (
        <div>
            <div className="user-container"></div>
            <h2 >Create a New Group</h2>
            <div className="text-container"></div>
            <div className="text-content"></div>
            <p>Please ensure that you are logged into your user account</p>
            <p>before initiating the creation of a new group. The functionality to</p>
            <p> establish a group is exclusively accessible to signed-in users.</p>
            <p>Your cooperation in adhering to this prerequisite is greatly appreciated.</p>
            <div className="form-group">
                <Button
                  className="glow-on-hover"
                  onClick={handleLoginClick}
                  id="log"
                >
                  Click here to login
                </Button>
              </div>
          <div className="makenew-container">
            <div className="makenew-info">
              <form onSubmit={handleSubmit} action="/createGroup" method="POST">
                <div className="form-group">
                  <label htmlFor="groupName">Group Name:</label>
                  <input
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    type="text"
                    name="groupName"
                    id="groupName"
                    placeholder="Enter Group Name"
                  />
                </div>
      
                <div className="form-group">
                  <label htmlFor="groupDescription">Group Description:</label>
                  <textarea
                    value={groupDescription}
                    onChange={(e) => setGroupDescription(e.target.value)}
                    placeholder="Describe your group..."
                    id="groupDescription"
                    name="groupDescription"
                  />
                </div>
      
                <div className="form-group">
                  <label htmlFor="groupMembers">Group Members:</label>
                  <ul>
                    {groupMembers.map((member, index) => (
                      <li key={index}>
                        {member}
                        <button
                          className="glow-on-hover"
                          type="button"
                          onClick={() => handleRemoveMember(member)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                  <input
                    type="text"
                    placeholder="Add member..."
                    value={newMember}
                    onChange={(e) => setNewMember(e.target.value)}
                  />
                  <button
                    className="glow-on-hover"
                    type="button"
                    onClick={handleAddMember}
                  >
                    Add Member
                  </button>
                </div>
                <div className="form-group">
                <button
                  className="glow-on-hover"
                  onClick={() => setShowMembersPopup(true)}
                >
                 Added Members
                </button>
              </div>

                <div className="form-group">
                  <button
                    className="glow-on-hover"
                    type="submit"
                    disabled={!loggedIn}
                  >
                    Create Group
                  </button>
                </div>
              </form>
      

            </div>
          </div>
      
          {/* Popup-ikkuna */}
          <Popup
            title="Group Members"
            showPopup={showMembersPopup}
            onClose={() => setShowMembersPopup(false)}
            fetchFunction={() => 'http://localhost:5000/api/groupMembers'} // Määrittele oikea reitti hakeaksesi ryhmän jäsenet
            renderItem={(item) => <div key={item}>{item}</div>} // Määrittele, miten jäsenet renderöidään
          />
          
          {/* TopBar ja Footer yhteen div-elementtiin käärittynä */}
          <div>
            <TopBar />
            <Footer />
          </div>
        </div>
      );
    };

    export default Makenew;