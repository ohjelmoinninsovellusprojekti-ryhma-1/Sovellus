import React from 'react';

export const Login = () => {
    return (
        <div class = "loginBox">
            <div class = "movieHub"><h1>MOVIEHUB</h1>
            </div>
            <form>
                <label htmlFor="email">Email:</label>
                <input type= "email" placeholder="youremail@gmail.com" id="email" name ="email"/>
                <br />
                <label htmlFor="password">Password: </label>
                <input type= "password" id="password" name ="password"/>
            </form>
            <div class = "loginInfo">Seeking entertainment options without an account?</div>
            <div class = "register">click here to register</div> 
        </div>
    )

}
//Rekisteröinti div muuttaa linkiksi?
export default Login;















/* import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
 

    const handleLogin = () => {
        setLoggedIn(true);
        onLogin(username);
    };

    return (
            <div>
             <h2>Login</h2>
             <label><strong>Username:</strong></label>
                 <input type= "text" value = {username}>  </input>
             <br/>
             <label><strong>Password:</strong></label>
                <input type= "password" value = {password}> </input>
             <br />
                <button onClick={handleLogin}>Login</button> 
            : ( 
                <h1> welcome, {username}</h1>
        ) //handlelogin ei toimi niinkuin pitäisi. Katso video tähän liittyen tai löydä?
    </div>
    )
};

export default Login;*/