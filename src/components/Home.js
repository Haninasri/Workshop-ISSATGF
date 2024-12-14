import React from 'react';
import { Card, CardContent, Typography, Box, Button, CardMedia } from '@mui/material';
import './styles.css';  // Import the CSS for any custom styles

const WelcomeCard = () => {
  return (
    <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
      <Card
        sx={{
          maxWidth: 600,
          padding: 3,
          backgroundColor: 'linear-gradient(to right, #2196f3, #21cbf3)', // Gradient background
          borderRadius: '10px', // Rounded corners
          boxShadow: 5, // Adding depth with box shadow
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', // Smooth transitions
          '&:hover': {
            transform: 'scale(1.05)', // Hover effect to enlarge the card
            boxShadow: 10, // Darker shadow on hover
          },
        }}
      >
        <CardContent>
          {/* ISSAT Gafsa Logo */}
          <CardMedia
            component="img"
            height="140"
            image="..\img\ISSAT.jpg" // Correct path to your logo image
            alt="ISSAT Gafsa Logo"
            sx={{ objectFit: 'contain', marginBottom: '20px' }}
          />
          <Typography variant="h4" component="div" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif', color: '#070bf2' }}>
            Bienvenue au Workshop IoT
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontFamily: 'Lora, serif', color: '#000' }}>
            ISSAT Gafsa
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontFamily: 'Roboto, sans-serif', color: '#000' }}>
            Nous sommes ravis de vous accueillir au workshop IoT à l'ISSAT Gafsa.
            Ce workshop est conçu pour vous initier à l'univers de l'Internet des Objets (IoT),
            en vous offrant une expérience pratique avec les dispositifs IoT, les capteurs et la collecte de données.
          </Typography>
          <Typography variant="body2" paragraph sx={{ fontFamily: 'Roboto, sans-serif', color: '#000' }}>
            Au cours de ce workshop, vous allez :
            <ul>
              <li>Apprendre les bases de la technologie IoT</li>
              <li>Travailler sur des projets IoT concrets</li>
              <li>Collaborer avec d'autres participants</li>
            </ul>
            Faisons de ce workshop une expérience passionnante et productive ensemble !
          </Typography>
          <Button variant="contained" color="secondary" sx={{ backgroundColor: '#ff4081', '&:hover': { backgroundColor: '#e91e63' } }}>
            Commencer
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WelcomeCard;
