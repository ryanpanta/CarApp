import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const cookieExists = document.cookie.split(';').some((item) => item.trim().startsWith('.AspNetCore.Session='));
    console.log(document.cookie);
    console.log(cookieExists);

  if (!cookieExists) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;