import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState ('');
    const [pass, setPass] = useState ('');
    const [nameFirst, setFirstName] = useState('');
    const [nameSecond, setSecondName] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => { 
        console.log(email);
        e.preventDefault();
    }

    return (
         <div class = "registerBox">
             <div class = "movieHub"><h1>MOVIEHUB</h1>
             </div>
            <>
            <form onSubmit = {handleSubmit}>
                <label htmlFor="firstname">First name</label>
                <input value = {nameFirst} onChange ={(e) => setFirstName(e.target.value)} name="firstname" id="firstname" placeholder="First name"></input>
                <label htmlFor="secondname"> Second name</label>
                <input value = {nameSecond} onChange ={(e) => setSecondName(e.target.value)} name="secondname" id="secondname" placeholder="Second name"></input>
                <label htmlFor="username"> Username</label>
                <input value = {username} onChange ={(e) => setUsername(e.target.value)} name="username" id="username" placeholder="Username"></input>
                <label htmlFor="email"> Email:</label>
                <input value = {email} onChange ={(e) => setEmail(e.target.value)} type= "email" placeholder="youremail@gmail.com" id="email" name ="email"/>
                <label htmlFor="password">Password: </label>
                <input value = {pass} onChange ={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name ="password"/>
                <label for = "pronouns">Pronouns</label>
                <select name = "pronounsChoose" id = "pronounsChoose">
                    <option value = "She">She/her</option>
                    <option value = "He">He/Him</option>
                    <option value = "They">They/them</option>
                    <option value = "empty">Empty</option>
                </select>
            </form>
            </>
            <button onClick={() => props.onFormSwitch('login')} class = "log">click here to login</button>
        </div>

    )
}
export default Register;
