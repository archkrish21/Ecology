import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About
            </Typography>
            <Typography variant="body2" color="text.secondary">
              The Ecological Food Web Simulator is a research-grade tool for modeling complex ecological interactions in food webs.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/" variant="body2" display="block">
              Home
            </Link>
            <Link component={RouterLink} to="/simulation" variant="body2" display="block">
              Simulation
            </Link>
            <Link component={RouterLink} to="/species-library" variant="body2" display="block">
              Species Library
            </Link>
            <Link component={RouterLink} to="/documentation" variant="body2" display="block">
              Documentation
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Resources
            </Typography>
            <Link href="#" variant="body2" display="block">
              API Documentation
            </Link>
            <Link href="#" variant="body2" display="block">
              Research Papers
            </Link>
            <Link href="#" variant="body2" display="block">
              Contact Us
            </Link>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'© '}
            {currentYear}
            {' Ecological Food Web Simulator. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;