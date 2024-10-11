import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Map from './Map';
import LoginPage from './LoginPage';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<Map />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </Router>
);

export default AppRouter;