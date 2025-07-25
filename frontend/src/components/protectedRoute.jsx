import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import named
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null); // null = loading

  useEffect(() => {
    const auth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        setIsAuthorized(false);
        return;
      }
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decoded.exp < now) {
          // Token expired, try to refresh
          const refreshToken = localStorage.getItem(REFRESH_TOKEN);
          if (!refreshToken) {
            setIsAuthorized(false);
            return;
          }
          try {
            const response = await api.post('token/refresh/', { refresh: refreshToken });
            localStorage.setItem(ACCESS_TOKEN, response.data.access);
            setIsAuthorized(true);
          } catch (err) {
            setIsAuthorized(false);
          }
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        setIsAuthorized(false);
      }
    };

    auth();
  }, []);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
