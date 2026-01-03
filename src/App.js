import React from 'react';
import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard'; 
import NewTrip from './NewTrip';
import TripSections from './TripSections';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/new-trip" element={<NewTrip />} />
          <Route path="/trip-sections" element={<TripSections />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;