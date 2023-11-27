import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 
import HomePage from './components/homepage.js';
import Login from "./login.jsx";
import { Register } from "./register.jsx";

function App() {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  return (
    <div className="App">{
      currentForm === "login" ? <Login onFormSwitch = {toggleForm}/> : <Register onFormSwitch = {toggleForm}/> //tarkista toimiiko?
    }
    <header className="App-header">
      <Router>
      </Router>
    </header>
  </div>
  );
}

export default App;
