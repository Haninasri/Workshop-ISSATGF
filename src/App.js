import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth, getUserRole } from './firebaseConfig'; // Import Firebase configuration
import NavBar from './components/NavBar';
import Home from './components/Home';
import Code from './components/Code';
import Presentation from './components/Presentation';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import AdminAddUser from './components/AdminAddUser';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Test from './components/Test';

const App = () => {
  const [user, setUser] = useState(null); // Track logged-in user
  const [role, setRole] = useState(''); // Track user role
  const [loading, setLoading] = useState(true); // Loading state while checking authentication

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const userRole = await getUserRole(currentUser.uid); // Fetch role from Firestore
        setUser(currentUser);
        setRole(userRole);
      } else {
        setUser(null);
        setRole('');
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup the subscription
  }, []);

  if (loading) return <div>Loading...</div>;  // Show loading indicator while checking user state

  return (
    <Router>
      <NavBar user={user} role={role} />  {/* Pass user and role to NavBar */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        {/* Public Routes */}
        <Route path="/action" element={user ? <Test /> : <Navigate to="/login" />} />

        {/* Protected Routes */}
        <Route 
          path="/admin/dashboard" 
          element={<ProtectedRoute element={<AdminDashboard />} roleRequired="admin" userRole={role} />} 
        />
        <Route 
          path="/admin/add-user" 
          element={<ProtectedRoute element={<AdminAddUser />} roleRequired="admin" userRole={role} />} 
        />
        <Route 
          path="/user/dashboard" 
          element={<ProtectedRoute element={<UserDashboard />} roleRequired="user" userRole={role} />} 
        />

        {/* Protect Code and Presentation routes for authenticated users */}
        <Route 
          path="/code" 
          element={user ? <Code /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/presentation" 
          element={user ? <Presentation /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
