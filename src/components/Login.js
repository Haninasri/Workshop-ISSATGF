import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';  // Ensure Firebase is configured correctly

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true); // Show loading spinner
    try {
      // Firebase authentication to log in user
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      setError('');
      // Redirect to home page or dashboard after successful login
      window.location.href = '/';  // Or use routing library (e.g., React Router)
    } catch (err) {
      setLoading(false);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: 'auto',
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        Login
      </Typography>

      {/* Error message */}
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

      {/* Login button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Login'}
      </Button>
    </Box>
  );
};

export default Login;
