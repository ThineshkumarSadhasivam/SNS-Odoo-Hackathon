import React from 'react';
import './App.css'; 
import Dashboard from './Dashboard'; 
import NewTrip from './NewTrip';// Changed to capital D to match standard naming

function App() {
  return (
    <div className="App">
      <Dashboard />
      <NewTrip/>
    </div>
  );
}

export default App;