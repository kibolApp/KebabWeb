import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Map from './pages/Map.js';
import MapClone from './pages/MapClone.js';
import AuthPage from './pages/AuthPage.js';
import AdminPanel from './pages/AdminPanel.js';
import ProtectedRoute from './components/ProtectedRoute.js';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<Map />} />
      <Route path="/map-clone" element={<MapClone />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default AppRouter;
