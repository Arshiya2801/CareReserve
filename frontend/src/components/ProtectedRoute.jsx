import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { token } = useContext(AppContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    // Basic JWT decode to get payload (token format: header.payload.signature)
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    // If specific roles are required and user role is not in the list
    if (allowedRoles.length > 0 && !allowedRoles.includes(payload.role)) {
      // Redirect based on their role
      if (payload.role === 'doctor') return <Navigate to="/doctor/dashboard" replace />;
      if (payload.role === 'patient') return <Navigate to="/patient/dashboard" replace />;
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    console.error("Invalid token format", error);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
