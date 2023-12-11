
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from './Popup.js';
import './marietta.css';

const User = ({ userId, username }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showFriendsPopup, setShowFriendsPopup] = useState(false);
  const [showGroupsPopup, setShowGroupsPopup] = useState(false);
  const [showFavoritesPopup, setShowFavoritesPopup] = useState(false);

  const [userData, setUserData] = useState({
    userId: userId,
    username: username,
    firstname: '',
    email: '',
    birthdate: '',
    phone_number: '',
    address: '',
    pronouns: '',
    profilePicture: null,
  });
  useEffect(() => {
    const fetchUserData = async () => {
        try {
          console.log('Fetching user data...');
          console.log('Userid in here:', userId);
          const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
          const userData1 = response.data;
      
          if (userData1.profile_picture && userData1.profile_picture.data) {
        
            const base64ProfilePicture = await arrayBufferToBase64(userData1.profile_picture.data);
            const profilePictureUrl = `data:image/jpeg;base64,${base64ProfilePicture}`;
            userData1.profile_picture = profilePictureUrl;
          }
      
          console.log('User data fetched successfully:', response.data);
      
       
          setUserData(userData1);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
    const arrayBufferToBase64 = (buffer) => {
      return new Promise((resolve, reject) => {
        const blob = new Blob([buffer], { type: 'image/jpeg' });
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result.split(',')[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };
  
    fetchUserData();
  }, [userId]);


   

  

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    console.log('Save button clicked');
    const birthdate1 = new Date(userData.birthdate).toISOString().split('T')[0];

    try {
      const formData = new FormData();
      formData.append('firstname', userData.firstname);
      formData.append('email', userData.email);
      formData.append('pronouns', userData.pronouns);
      formData.append('birthdate', birthdate1);
      formData.append('phone_number', userData.phone_number);
      formData.append('address', userData.address);
      formData.append('profilePicture', userData.profilePicture); 

      const response = await axios.post(`http://localhost:5000/api/user/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const updatedUser = response.data;
        setUserData(updatedUser);
        setIsEditing(false);
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleInputChange = (e, field) => {
    setUserData({
      ...userData,
      [field]: e.target.value,
    });
  };

const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({
          ...userData,
          profilePicture: reader.result, 
        });
      };
      reader.readAsDataURL(file);
    } else {
     
      setUserData({
        ...userData,
        profilePicture: null, 
      });
    }
  };

  const handlePictureUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', userData.profilePicture); 
  
      const response = await axios.post(`http://localhost:5000/api/user/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        const updatedUser = response.data;
        setUserData(updatedUser);
        setIsEditing(false);
      } else {
        console.error('Failed to update profile picture');
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };
  const handleChangeUsername = async () => {
    const newUsername = prompt('Enter new username:');
    if (newUsername) {
      const updatedUserData = {
        ...userData,
        username: newUsername,
      };

      try {
        const response = await axios.post(`http://localhost:5000/api/user/${userId}`, updatedUserData);

        if (response.status === 200) {
          const updatedUser = response.data;
          setUserData(updatedUser);
        } else {
          console.error('Failed to update username');
        }
      } catch (error) {
        console.error('Error updating username:', error);
      }
    }
  };

  const handleChangePassword = async () => {
    const newPassword = prompt('Enter new password:');
    if (newPassword) {
      // Tässä voidaan toteuttaa tarvittavat toimenpiteet salasanan vaihtamiseksi!!
      // Käytetään turvallisia salasanan tallennusmenetelmiä, kuten bcryptiä!!
      console.log('New password:', newPassword);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmation = window.confirm('Are you sure you want to delete your account?');
    if (confirmation) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/user/${userId}`);

        if (response.status === 200) {
          // Voidaan suorittaa lisätoimenpiteitä tarvittaessa!!
          console.log('Account and data deleted successfully');
        } else {
          console.error('Failed to delete account, please try again');
        }
      } catch (error) {
        console.error('Error deleting user account:', error);
      }
    }
  };
  const handleClosePopup = () => {
    setShowFavoritesPopup(false); 
  };
  return (
    <>
      <div className="user-container">
        <h2>{isEditing ? 'Edit Your Profile' : 'Your Profile'}</h2>
        <div className="info-flex">
          <div className="info">
            <div>
              <label>Username:</label>
            </div>
            <div>{userData.username}</div>
            <div>
              <label>Name:</label>
            </div>
            <input
              type="text"
              value={userData.firstname}
              readOnly={!isEditing}
              onChange={(e) => handleInputChange(e, 'firstname')}
            />
            <div>
              <label>Email:</label>
            </div>
            <input
              type="text"
              value={userData.email}
              readOnly={!isEditing}
              onChange={(e) => handleInputChange(e, 'email')}
            />
            <div>
              <label>Birthdate:</label>
            </div>
            <input
              type="text"
              value={userData.birthdate}
              readOnly={!isEditing}
              onChange={(e) => handleInputChange(e, 'birthdate')}
            />
            <div>
              <label>Phone Number:</label>
            </div>
            <input
              type="text"
              value={userData.phone_number}
              readOnly={!isEditing}
              onChange={(e) => handleInputChange(e, 'phone_number')}
            />
            <div>
              <label>Address:</label>
            </div>
            <input
              type="text"
              value={userData.address}
              readOnly={!isEditing}
              onChange={(e) => handleInputChange(e, 'address')}
            />
            <div>
              <label>Pronouns:</label>
            </div>
            {isEditing ? (
              <select
                value={userData.pronouns}
                onChange={(e) => handleInputChange(e, 'pronouns')}
                style={{ width: '200px', fontSize: '16px' }}
              >
                <option value="She/Her">She/Her</option>
                <option value="He/His">He/His</option>
                <option value="They/Them">They/Them</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <span>{userData.pronouns}</span>
            )}
            <div>
              {/* Edit and Save buttons */}
              {isEditing ? (
                <button type="button" onClick={handleSaveClick}>
                  Save
                </button>
              ) : (
                <button type="button" onClick={handleEditClick}>
                  Edit information
                </button>
              )}
            </div>
          </div>
          {/* Tähän voipi lisätä kamaa jos tuntuu siltä */}
          {/* ... */}

          {/* Profile Picture */}
      <div className="you">
        <label>Profile picture:</label>
        {userData.profilePicture ? (
          <img src={userData.profilePicture} alt="Profile" className="profile-picture" />
        ) : (
          <span>No picture available</span>
        )}
        {isEditing && (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handlePictureChange(e)}
            />
            <button type="button" onClick={handlePictureUpload}>
              Change Picture
            </button>
          </>
        )}
      </div>
        </div>
        <div className="user-info">
          {/* Friends List 
          <div>
            <label>Friends:</label>
            
            <button type="button" onClick={() => setShowFriendsPopup(true)}>
              Show more
            </button>
            <Popup
              title="Friends"
              showPopup={showFriendsPopup}
              onClose={() => handleClosePopup(setShowFriendsPopup)}
              fetchFunction={() => 'http://localhost:3000/friends'} // HÖÖ Vaihda oikea polku!!
              renderItem={(friend) => (
                <span key={friend}>{friend}</span>
              )}
            />
          </div>*/}

          {/* Groups List*/} 
          <div>
            <label>Groups:</label>
            
            <button type="button" onClick={() => setShowGroupsPopup(true)}>
              Show more
            </button>
            <Popup
              title="Groups"
              showPopup={showGroupsPopup}
              onClose={() => handleClosePopup(setShowGroupsPopup)}
              fetchFunction={() => 'http://localhost:3000/groups'} // HÖÖ Vaihda oikea polku!!
              renderItem={(group) => (
                <span key={group}>{group}</span>
              )}
            />
          </div>

      <div>
      <label>My Favorites:</label>
        <button type="button" onClick={() => setShowFavoritesPopup(true)}>
          Show more
        </button>
        <Popup
          title="My Favorites"
          showPopup={showFavoritesPopup}
          onClose={() => setShowFavoritesPopup(false)}
          fetchFunction={() => `http://localhost:5000/api/favorites/${userId}`}
          renderItem={(favorite) => (
            <div key={favorite.movie_id}>
              <span>{/* You can display other movie details here */}</span>
              <span>{favorite.movie_id}</span>
            </div>
          )}
        />
      </div>

        </div>

        {/* Account Management */}
        <div className="account-container">
          <div className="account-header">
            <label>Account Management</label>
          </div>
          <div className="account">
            <button type="button" onClick={handleChangeUsername}>
              Change Username
            </button>
            <button type="button" onClick={handleChangePassword}>
              Change Password
            </button>
            <button type="button" onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
