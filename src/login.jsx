
import React, { useState } from 'react';
import './milla.css';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username: username,
        password: password,
      });

      console.log('Server response:', response.data);

      if (response.data.success) {
        onLogin({ userId: response.data.userId, username: username });
        console.log('Server response:', response.data);
      } else {
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleRegisterClick = () => {
    console.log('Register button clicked');
    navigate('/register');
  };

  const handleBrowseReviews = () => {
    // Use the navigate function to navigate to http://localhost:3000/browse-reviews
    navigate('/browse-reviews');
  };

  return (
    <div className="loginCont">
      <div className="loginBox">
        <div className="movieHub">
          <h1>MOVIEHUB</h1>
        </div>
        <>
          <form onSubmit={handleLogin} action="/login" method="POST">
            <label htmlFor="username">Username:</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="yourusername"
              id="username"
              name="username"
            />
            <br />
            <label htmlFor="password">Password: </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="*********"
              id="password"
              name="password"
            />
            <button className="logInButton" type="submit">
              <h2>Log in</h2>
            </button>
          </form>
        </>
        <div className="loginInfo">
          <button onClick={handleBrowseReviews}>
            Seeking entertainment options without an account?
          </button>
        </div>
        <Button onClick={handleRegisterClick} id="register">
          click here to register
        </Button>
      </div>
    </div>
  );
};

export default Login;



