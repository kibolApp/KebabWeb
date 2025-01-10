import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axiosClient from '../axiosClient.js';

export default function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const response = await axiosClient.get('/getCurrentUser', {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });
        const user = response.data.user;
        setIsAuthorized(user.isAdmin === 1);
      } catch (error) {
        console.error('Błąd podczas sprawdzania uprawnień:', error);
        setIsAuthorized(false);
      }
    };

    checkAuthorization();
  }, []);

  return isAuthorized ? children : <Navigate to="/map" />;
}
