import React, { useState } from "react";

export const Login = (props) => {
    const [email, setEmail] = useState ('');
    const [pass, setPass] = useState ('');

    const handleSubmit = (e) => { 
        console.log(email);
        e.preventDefault();

    }

    return (
    <div class ="loginCont">  
        <div class = "loginBox">
            <div class = "movieHub"><h1>MOVIEHUB</h1>
            </div>
            <>
            <form onSubmit = {handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input value = {email} onChange ={(e) => setEmail(e.target.value)} type= "email" placeholder="youremail@gmail.com" id="email" name ="email"/>
                <br />
                <label htmlFor="password">Password: </label>
                <input value = {pass} onChange ={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name ="password"/>
                <button class = "logInButton"><h2>Log in</h2></button>          
            </form>
            </>
            <div class = "loginInfo">Seeking entertainment options without an account?</div>
            <button onClick={() => props.onFormSwitch('register')} class = "register">click here to register</button>
        </div> 
    </div>  
    )

}
//Rekisteröinti div muuttaa linkiksi?
export default Login;

