import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Import auth from firebase.js

const NavBar = ({ user, role }) => {
  const handleLogout = () => {
    auth.signOut(); // Call signOut to log out the user
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Home</Button>

        {role === 'admin' && (
          <>
            <Button color="inherit" component={Link} to="/code">Code</Button>
            <Button color="inherit" component={Link} to="/presentation">Presentation</Button>
            <Button color="inherit" component={Link} to="/action">Action</Button>
            <Button color="inherit" component={Link} to="/admin/dashboard">Admin Dashboard</Button>
            <Button color="inherit" component={Link} to="/admin/add-user">Add User</Button>
          </>
        )}
        {role === 'user' && (
          <>

          <Button color="inherit" component={Link} to="/user/dashboard">User Dashboard</Button>
          <Button color="inherit" component={Link} to="/code">Code</Button>
          <Button color="inherit" component={Link} to="/presentation">Presentation</Button>
          <Button color="inherit" component={Link} to="/action">Action</Button>
          </>
        )}
        {user && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
