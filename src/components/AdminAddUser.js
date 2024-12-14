import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, setUserRole } from '../firebaseConfig';  // Import necessary Firebase functions

const AdminAddUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddUser = async () => {
    setLoading(true); // Show loading state
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Get the created user

      // Set user role in Firestore
      await setUserRole(user.uid, email, role);

      // Reset the form
      setEmail('');
      setPassword('');
      setRole('user');
      alert('User added successfully!');
    } catch (err) {
      setError('Error: ' + err.message);  // Handle errors
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 3, boxShadow: 3, borderRadius: 2, backgroundColor: 'background.paper' }}>
      <Typography variant="h5" gutterBottom align="center">Add User</Typography>

      {/* Display error message */}
      {error && <Typography color="error" variant="body2">{error}</Typography>}

      {/* Email field */}
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      {/* Password field */}
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      {/* Role field */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Role</InputLabel>
        <Select value={role} onChange={(e) => setRole(e.target.value)} label="Role">
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>

      {/* Add User button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleAddUser}
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add User'}
      </Button>
    </Box>
  );
};

export default AdminAddUser;
