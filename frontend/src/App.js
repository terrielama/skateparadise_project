import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes à la place de Switch
import Home from './Home';
import "../src/assets/bootstrap-5.3.3-dist/css/bootstrap.min.css";
import '../src/assets/css/style.css';
import Profile from './components/Profile';
import Logout from './components/Logout';

function App() {
  return (
    <Router>
      <div>
        <Routes>  {/* Remplace Switch par Routes */}
          <Route path="/profile" element={<Profile />} />  {/* Utilisation de element au lieu de component */}
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Home />} />  {/* Page d'accueil */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
