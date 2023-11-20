import React, { useState } from 'react';
import '../App.css';
import TopBar from '../components/topbar.js';
import Footer from '../components/footer.js';

export const User = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    name: 'Björn Nakilla',
    email: 'nakilla.bjorn@hallonbotar.se',
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Implement logic to save user modifications (send to server or update state)
    setIsEditing(false);
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
        <div className="user-info"> 
            <h2>{isEditing ? 'Edit Your Profile' : 'Your Profile'}</h2>

        <div>
          <label>Name:</label>
          <input
            type="text"
            value={userData.name}
            readOnly={!isEditing}
            onChange={(e) => handleInputChange(e, 'name')}
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="text"
            value={userData.email}
            readOnly={!isEditing}
            onChange={(e) => handleInputChange(e, 'email')}
          />
        </div>

        <div>
          <label>Birthdate:</label>
          <input
            type="text"
            value={userData.birthdate}
            readOnly={!isEditing}
            onChange={(e) => handleInputChange(e, 'birthdate')}
          />
        </div>

        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={userData.phoneNumber}
            readOnly={!isEditing}
            onChange={(e) => handleInputChange(e, 'phoneNumber')}
          />
        </div>

        <div>
          <label>Address:</label>
          <input
            type="text"
            value={userData.address}
            readOnly={!isEditing}
            onChange={(e) => handleInputChange(e, 'address')}
          />
        </div>

        <div>
          <label>Pronouns:</label>
          <input
            type="text"
            value={userData.pronouns}
            readOnly={!isEditing}
            onChange={(e) => handleInputChange(e, 'pronouns')}
          />
        </div>

        {/* Add similar input fields for other user details */}
        {/* ... */}

        {/* Profile Picture */}
        <div>
          <label>You:</label>
          <img src={userData.profilePicture} alt="Profile" />
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

        {/* Edit and Save buttons */}
        {isEditing ? (
          <button type="button" onClick={handleSaveClick}>
            Save
          </button>
        ) : (
          <button type="button" onClick={handleEditClick}>
            Edit Info
          </button>
        )}
      </div>
    </div>
    
    {/* TopBar component */}
    <TopBar />
    <Footer />
    </>
  );
 };
 

export default User;
