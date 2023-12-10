import React, { useState } from 'react';
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







































/*import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


export const Login = (props) => {
    const [username, setUsername] = useState ('');
    const [password, setPassword] = useState ('');
    const navigate = useNavigate();

    const handleRegisterCLick = () => {
        handleButton();
    }

    const handleButton = () => { 
        navigate('./register')
    }

    const handleSubmit = async (e) => { 
        e.preventDefault();

        const loginData = {
            username,
            password,
        };

    try {
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
        
            if (response.ok) {
                navigate('./home');
            } else {
                throw new Error('Registration failed');
            };
         } catch (error) {
            console.error('ERROR when sending post', error);
        };
    };
    
    return (
    <div className ="loginCont">  
        <div className = "loginBox">
            <div className = "movieHub"><h1>MOVIEHUB</h1>
            </div>
            <>
            <form onSubmit = {handleSubmit} action="/login" method="POST">
                <label htmlFor="username">Username:</label>
                <input value = {username} onChange={(e) => setUsername(e.target.value)} type= "username" placeholder="username" id="username" name ="username"/>
                <br />
                <label htmlFor="password">Password: </label>
                <input value = {password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*********" id="password" name ="password"/>    
                <button className = "logInButton" type="submit"><h2>Log in</h2></button>      
            </form>
            </>
            <div className = "loginInfo">Seeking entertainment options without an account?</div>
            <Button onClick={handleRegisterCLick} id = "register">click here to register</Button>
        </div> 
    </div>  
    )
};
export default Login;

*/