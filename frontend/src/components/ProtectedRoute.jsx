import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { token } = useContext(AppContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    // Basic JWT decode to get payload
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userRole = payload.role || 'patient'; // Fallback to patient for legacy tokens without role
    
    // If specific roles are required and user role is not in the list
    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
      // Redirect based on their role to avoid infinite loops
      if (userRole === 'doctor') return <Navigate to="/doctor/dashboard" replace />;
      if (userRole === 'patient') return <Navigate to="/patient/dashboard" replace />;
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    console.error("Invalid token format", error);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
