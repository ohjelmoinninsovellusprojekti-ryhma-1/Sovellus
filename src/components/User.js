import React, { useState, useEffect } from 'react';
import '../App.css';
import TopBar from '../components/topbar.js';
import Footer from '../components/footer.js';


export const User = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    name: 'perse silmä',
    email: 'olaf.svensson@hallonbotar.se',
    birthdate: '1990-01-01',
    phoneNumber: '123-456-7890',
    address: 'Snusgatan 789, Snus, Jättebra',
    pronouns: 'They/Them',
    profilePicture: 'path/to/profile-picture.jpg',
    friends: ['Friend 1', 'Friend 2', 'Friend 3'],
    bestFriends: ['Bestie 1', 'Bestie 2', 'Bestie 3'],
    groups: ['Group 1', 'Group 2', 'Group 3'],
    favoriteMovies: ['Movie 1', 'Movie 2', 'Movie 3'],
    favoriteSeries: ['Series 1', 'Series 2', 'Series 3'],
  });
 
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

  return (
    <>

    <div className="user-container"> 

            <h2>{isEditing ? 'Edit Your Profile' : 'Your Profile'}</h2>
<div className="info-flex">
  <div className="info">
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
          <input
            type="text"
            value={userData.pronouns}
            readOnly={!isEditing}
            onChange={(e) => handleInputChange(e, 'pronouns')}
          />
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
          {userData.friends.map((friend, index) => (
            <div key={index}>{friend}</div>
          ))}
          <button type="button" onClick={() => console.log('Expand Friends')}>
            Show more
          </button>
        </div>

        {/* Best Friends */}
        <div>
          <label>Best Friends:</label>
          {userData.bestFriends.map((bestie, index) => (
            <div key={index}>{bestie}</div>
          ))}
          <button type="button" onClick={() => console.log('Expand Best Friends')}>
            Show more
          </button>
        </div>

        {/*Groups */}
        <div>
          <label>Groups:</label>
          {userData.groups.map((group, index) => (
            <div key={index}>{group}</div>
          ))}
          <button type="button" onClick={() => console.log('Expand Groups')}>
            Show more
          </button>
        </div>

        {/* Favorite Movies */}
        <div>
          <label>Favorite Movies:</label>
          {userData.favoriteMovies.map((movie, index) => (
            <div key={index}>{movie}</div>
          ))}
          <button type="button" onClick={() => console.log('Expand Favorite Movies')}>
            Show more
          </button>
        </div>

        {/* Favorite Series */}
        <div>
          <label>Favorite Series:</label>
          {userData.favoriteSeries.map((series, index) => (
            <div key={index}>{series}</div>
          ))}
          <button type="button" onClick={() => console.log('Expand Favorite Series')}>
            Show more
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
