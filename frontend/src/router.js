import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.js'
import Map from './pages/Map.js'
import LoginPage from './pages/LoginPage.js'

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<Map />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </Router>
)

export default AppRouter
