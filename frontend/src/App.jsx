import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminDashboard from './pages/Admin/AdminDashboard';
import MRDashboard from './pages/MR/MRDashboard';

function App() {
  return (
    <Router>
      <div>
        {/* Temporary Navigation Bar for Development */}
        <nav style={{ padding: '10px', background: '#eee', marginBottom: '20px' }}>
          <strong>Employee Tracker App </strong> |{' '}
          <Link to="/admin">Admin Portal</Link> |{' '}
          <Link to="/mr">MR Portal</Link>
        </nav>

        {/* Routes definitions */}
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/mr" element={<MRDashboard />} />
          
          {/* Default route redirects to a simple home or login page later */}
          <Route path="/" element={<div style={{ padding: '20px' }}><h2>Welcome. Please select a portal above.</h2></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;