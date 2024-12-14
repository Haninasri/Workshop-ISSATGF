import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1976d2', // Primary theme color
        color: '#fff', // White text for contrast
        padding: '20px 0',
        textAlign: 'center',
        marginTop: 'auto',
      }}
    >
      <Typography variant="body2" sx={{ fontFamily: 'Roboto, sans-serif' }}>
        © {new Date().getFullYear()} ISSAT Gafsa - Workshop IoT. Tous droits réservés.
      </Typography>
      <Typography variant="body2" sx={{ marginTop: '8px', fontFamily: 'Roboto, sans-serif' }}>
        Contactez-nous :{' '}
        <Link href="mailto:issatgf.website@gmail.com" color="inherit" underline="hover">
          issatgf.website@gmail.com
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
