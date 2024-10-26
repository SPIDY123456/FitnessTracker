import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from "./pages/Profile";
import EditProfile from './pages/EditProfile';

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4 bg-stone-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path = '/profile' element={<Profile/>} />
          <Route path = '/edit-profile'element={<EditProfile/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
