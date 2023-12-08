import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


export const Login = (props) => {
    const [email, setEmail] = useState ('');
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
            email,
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
                <label htmlFor="email">Email:</label>
                <input value = {email} onChange={(e) => setEmail(e.target.value)} type= "email" placeholder="youremail@gmail.com" id="email" name ="email"/>
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

