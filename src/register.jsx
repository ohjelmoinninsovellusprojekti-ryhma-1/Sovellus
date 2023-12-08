import React, { useState } from "react"; //muokkaa register ja login erillisiksi sivuiksi, jotta tietokannan saisi toimimaan. Server.js pyörii nyt node server.js komennolla. Postmanissa ongelmia 
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export const Register = (props) => {
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');
    const [firstname, setFirstName] = useState('');
    const [secondname, setSecondName] = useState('');
    const [username, setUsername] = useState('');
    const [pronouns, setPronouns] = useState('');
    const navigate = useNavigate();

const handleLoginCLick = () => {
       handleButton();
};

const handleButton = () => {
    navigate('../')
};

const handleSubmit = async (e) => { 
        e.preventDefault();

    const userData = {
            firstname, 
            secondname, 
            username,
            email,
            password,
            pronouns
    };
        

    try {
        const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            navigate('../');
        } else {
            throw new Error('Registration failed');
        };
    } catch (error) {
        console.error('ERROR when sending post', error);
    };
};


    return (
         <div className = "registerBox">
             <div className = "movieHub"><h1>MOVIEHUB</h1>
             </div>
            <>
            <form onSubmit = {handleSubmit} action="/register" method="POST">
                <label htmlFor="firstname">First name</label>
                <input value = {firstname} onChange={(e) => setFirstName(e.target.value)} type= "text"  name="firstname" id="firstname" placeholder="First name"></input>
                <label htmlFor="secondname"> Last name</label>
                <input value = {secondname} onChange={(e) => setSecondName(e.target.value)} type= "text"  name="secondname" id="secondname" placeholder="Second name"></input>
                <label htmlFor="username"> Username</label>
                <input value = {username} onChange={(e) => setUsername(e.target.value)} type= "text" name="username" id="username" placeholder="Username"></input>
                <label htmlFor="email"> Email:</label>
                <input value = {email} onChange={(e) => setEmail(e.target.value)} type= "email" placeholder="youremail@gmail.com" id="email" name ="email"/>
                <label htmlFor="password">Password: </label>
                <input value = {password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name ="password"/>
                <label htmlFor = "pronouns">Pronouns</label>
                <select value = {pronouns}  onChange={(e) => setPronouns(e.target.value)} name = "pronouns" id = "pronouns">
                    <option value = "Null"></option>
                    <option value = "She">She/her</option>
                    <option value = "He">He/Him</option>
                    <option value = "They">They/them</option>
                    <option value = "Empty">Empty</option>
                </select>
            </form>
            </>
            <button className = "registerDone" onClick={handleSubmit}> Register Done </button>
            <Button onClick={ handleLoginCLick } id = "log">click here to login</Button>
        </div>
    )};

export default Register;
