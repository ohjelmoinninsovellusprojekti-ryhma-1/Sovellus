import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 
import HomePage from './components/homepage.js';
import Login from "./components/login.js";
import { Register } from "./register.jsx";
import User from './components/User.js';
import Groups from './components/Groups.js';


function App() {
  return (
    <div className="App">
    <header className="App-header">
      <Router>
        <Routes>
          <Route path ="/" element = { <Login />} />
          <Route path ="/home" element = { <HomePage />} />
          <Route path ="/user" element = { <User />} />
          <Route path ="/groups" element = { <Groups />} />
        </Routes>
      </Router>
    </header>
  </div>
  );
}

export default App;
