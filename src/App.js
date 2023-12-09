import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 
import HomePage from './homepage.jsx';
import Login from "./login.jsx";
import { Register } from "./register.jsx";
import Movies from './movies.jsx';
import Series from './series.jsx';
import ContactUs from './contactUs.jsx';

function App() {
  return (
      <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/movies/*" element={<Movies />} />
            <Route path="/series/*" element={<Series />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}
  

export default App;
