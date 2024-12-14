import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const AdminDashboard = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Tableau de bord administrateur</Typography>
      <Typography variant="body1" sx={{ marginBottom: '16px' }}>Bienvenue, administrateur ! Voici les fonctionnalités disponibles :</Typography>
      <Button variant="contained" color="primary" sx={{ marginBottom: '10px' }}>Gérer les utilisateurs</Button>
      <Button variant="contained" color="secondary">Paramètres</Button>
    </Box>
  );
};

export default AdminDashboard;
