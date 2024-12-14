import { Box, Typography, Button } from '@mui/material';

const Test = () => {
  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: 'background.default',
        borderRadius: 2,
        boxShadow: 3,
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" color="primary" gutterBottom>
        Test Page
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Utilisez cette page pour effectuer vos tests.
      </Typography>
      <Button variant="contained" color="secondary">
        Action
      </Button>
    </Box>
  );
};

export default Test;
