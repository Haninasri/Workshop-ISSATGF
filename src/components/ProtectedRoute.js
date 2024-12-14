import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';  // Ensure you're importing auth from firebase

const ProtectedRoute = ({ element, roleRequired, userRole }) => {
  const isAuthenticated = auth.currentUser; // Check if the user is authenticated
  const hasRequiredRole = userRole === roleRequired; // Check if the user has the required role

  if (!isAuthenticated) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" />;
  }

  if (roleRequired && !hasRequiredRole) {
    // Redirect to home if the user doesn't have the required role
    return <Navigate to="/" />;
  }

  return element; // Return the element if the route is protected
};

export default ProtectedRoute;
