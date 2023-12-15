
import React, { useState } from 'react';
import '../milla.css';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

  
    if (!username || !password) {
      console.error('Username and password are required');
      return; 
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username: username,
        password: password,
      });

      console.log('Server response:', response.data);

      if (response.data.success) {
        onLogin({ userId: response.data.userId, username: username });
        console.log('Server response:', response.data);
        navigate('/homepage');
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
    navigate('/browse-reviews');
  };
  
  return (
    <div className="loginCont">
      <div className="loginBox">
        <h1 className="custom-heading">MOVIEHUB</h1>
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
              Log in
            </button>
          </form>
        </>
        <div className="loginInfo">
          <button className="entertainment" onClick={handleBrowseReviews}>
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
