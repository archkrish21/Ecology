import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

function NotFoundPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <SentimentDissatisfiedIcon sx={{ fontSize: 100, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h3" gutterBottom>
          404: Page Not Found
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Oops! The page you're looking for seems to have wandered off into the ecosystem.
        </Typography>
        <Typography variant="body1" paragraph sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
          It might have been consumed by a digital predator, or perhaps it's just hiding in a different habitat. Let's get you back to a known location in our food web.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/"
          >
            Return to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default NotFoundPage;