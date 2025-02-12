import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'; // Import du composant Home

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Route pour la page d'accueil */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
