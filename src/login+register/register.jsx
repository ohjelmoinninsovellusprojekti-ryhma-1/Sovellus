
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../milla.css';

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [secondname, setSecondName] = useState('');
    const [username, setUsername] = useState('');
    const [pronouns, setPronouns] = useState('');
    const navigate = useNavigate();

    const handleLoginCLick = () => {
        handleButton();
    };

    const handleButton = () => {
        navigate('../');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            name: firstname,
            lname: secondname,
            username,
            email,
            password,
            pronouns
        };
        console.log('User Data:', userData);
        try {
           const response = await axios.post('http://localhost:5000/api/register', userData, {
            headers: {
                    'Content-Type': 'application/json',
                    
                },
            });
            console.log('Server response:', response);
            if (response.status === 200) {
                console.log('Registration successful');
                navigate('../');
            } else {
                console.error('Registration failed. Server returned:', response);
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('ERROR when sending post', error);
            console.error('Server response:', error.response);
        }
    };

    return (
        <div className="registerContainer">
        <div className="registerBox">
        <h1 className="custom-heading">MOVIEHUB</h1>
            <>
                <form onSubmit={handleSubmit} action="/register" method="POST">
                    <label htmlFor="firstname">First name</label>
                    <input value={firstname} onChange={(e) => setFirstName(e.target.value)} type="text" name="firstname" id="firstname" placeholder="First name" />

                    <label htmlFor="secondname">Last name</label>
                    <input value={secondname} onChange={(e) => setSecondName(e.target.value)} type="text" name="secondname" id="secondname" placeholder="Last name" />

                    <label htmlFor="username">Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username" placeholder="Username" />

                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />

                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" />

                    <label htmlFor="pronouns">Pronouns</label>
                    <select value={pronouns} onChange={(e) => setPronouns(e.target.value)} name="pronouns" id="pronouns">
                        <option value="Null"></option>
                        <option value="She">She/her</option>
                        <option value="He">He/Him</option>
                        <option value="They">They/them</option>
                        <option value="Empty">Empty</option>
                    </select>
                 <button type="submit" className="registerDone">Register Done</button>   
                </form>
                
            </>
            <Button onClick={handleLoginCLick} id="log">Click here to login</Button>
        </div>
        </div>
    );
};

export default Register;

