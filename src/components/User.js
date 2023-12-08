import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from '../components/Popup.js';
import '../App.css';
import TopBar from '../components/topbar.js';
import Footer from '../components/footer.js';


export const User = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showFriendsPopup, setShowFriendsPopup] = useState(false);
  const [showGroupsPopup, setShowGroupsPopup] = useState(false);
  const [showFavoritesPopup, setShowFavoritesPopup] = useState(false);

  const [userData, setUserData] = useState({
    id: 1,
    username: 'käyttäjänimi', // Tämä on käyttäjänimi, ei nimi!!!
    name: 'perse silmä',
    email: 'olaf.svensson@hallonbotar.se',
    birthdate: '1990-01-01',
    phoneNumber: '123-456-7890',
    address: 'Snusgatan 789, Snus, Jättebra',
    pronouns: 'They/Them',
    profilePicture: 'path/to/profile-picture.jpg',
    friends: ['Friend 1', 'Friend 2', 'Friend 3'],
    groups: ['Group 1', 'Group 2', 'Group 3'],
    favorites: ['Favorite 1', 'Favorite 2', 'Favorite 3'],
  });


const handleClosePopup = (setPopupState) => {
  setPopupState(false);
};

  useEffect(() => {
    console.log('isEditing:', isEditing);
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  
  const handleSaveClick = async () => {
    console.log('Save button clicked');
    const updatedUserData = {
      id: userData.id,
      username: userData.username,
      name: userData.name,
      email: userData.email,
      birthdate: userData.birthdate,
      phoneNumber: userData.phoneNumber,
      address: userData.address,
      pronouns: userData.pronouns
    };
  
    const response = await fetch('http://localhost:3000/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUserData)
    });
  
    if (response.ok) {
      const updatedUser = await response.json();
      setUserData(updatedUser);
      setIsEditing(false);
    } else {
      console.error('Failed to update user');
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
      }
  };
  const handleChangeUsername = async () => {
    const newUsername = prompt('Enter new username:');
    if (newUsername) {
      const updatedUserData = {
        ...userData,
        name: newUsername,
      };

      const response = await fetch('http://localhost:3000/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserData(updatedUser);
      } else {
        console.error('Failed to update username');
      }
    }
  };

  const handleChangePassword = async () => {
    const newPassword = prompt('Enter new password:');
    if (newPassword) {
      // Tässä voit toteuttaa tarvittavat toimenpiteet salasanan vaihtamiseksi
      // Käytä turvallisia salasanan tallennusmenetelmiä, kuten bcrypt
      console.log('New password:', newPassword);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmation = window.confirm('Are you sure you want to delete your account?');
    if (confirmation) {
      const response = await fetch(`http://localhost:3000/user/${userData.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Voit suorittaa lisätoimenpiteitä tarvittaessa
        console.log('Account and data deleted successfully');
      } else {
        console.error('Failed to delete account, please try again');
      }
    }
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
          <input
          type="text"
          value={userData.username}
          readOnly={!isEditing}
          onChange={(e) => handleInputChange(e, 'username')}
        />
        <div>
          <label>Name:</label>
          </div>
          <input
            type="text"
            value={userData.name}
            readOnly={!isEditing}
            onChange={(e) => handleInputChange(e, 'name')}
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
            value={userData.phoneNumber}
            readOnly={!isEditing}
            onChange={(e) => handleInputChange(e, 'phoneNumber')}
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
        {/* Add similar input fields for other user details */}
        {/* ... */}

        {/* Profile Picture */}
        <div className="you">
          <label>Profile picture:</label>
          <img src={userData.profilePicture} alt="" />
          {isEditing && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handlePictureChange}
              />
              <button type="button" onClick={handlePictureChange}>
                Change Picture
              </button>
            </>
          )}
        </div>
        </div>
        <div className="user-info"> 
             {/* Friends List */}
             <div>
          <label>Friends:</label>
          {/* ... */}
          <button type="button" onClick={() => setShowFriendsPopup(true)}>
            Show more
          </button>
          <Popup
            title="Friends"
            showPopup={showFriendsPopup}
            onClose={() => handleClosePopup(setShowFriendsPopup)}
            fetchFunction={() => 'http://localhost:3000/friends'} // Vaihda oikea polku
            renderItem={(friend) => (
              <span key={friend}>{friend}</span>
            )}
         />
        </div>

        {/* Groups List */}
        <div>
          <label>Groups:</label>
          {/* ... */}
          <button type="button" onClick={() => setShowGroupsPopup(true)}>
            Show more
          </button>
          <Popup
            title="Groups"
            showPopup={showGroupsPopup}
            onClose={() => handleClosePopup(setShowGroupsPopup)}
            fetchFunction={() => 'http://localhost:3000/groups'} // Vaihda oikea polku
            renderItem={(group) => (
              <span key={group}>{group}</span>
            )}
          />
        </div>

        {/* Favorites List */}
        <div>
          <label>My Favorites:</label>
          {/* ... */}
          <button type="button" onClick={() => setShowFavoritesPopup(true)}>
            Show more
          </button>
          <Popup
            title="My Favorites"
            showPopup={showFavoritesPopup}
            onClose={() => handleClosePopup(setShowFavoritesPopup)}
            fetchFunction={() => 'http://localhost:3000/favorites'} // Vaihda oikea polku
            renderItem={(favorite) => (
              <span key={favorite}>{favorite}</span>
            )}
          />
        </div>

        {/* Account Managment */}
      </div>
        <div className="account-container">
         <div className="account-header">
          <label>Account Managment</label>
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
    
    
{/* TopBar/Footer component */}
    <TopBar />
    <Footer />
    </>
  );
 };
 

export default User;
