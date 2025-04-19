import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

// Icons
import EcoIcon from '@mui/icons-material/Eco';
import BiotechIcon from '@mui/icons-material/Biotech';
import BarChartIcon from '@mui/icons-material/BarChart';
import MenuBookIcon from '@mui/icons-material/MenuBook';

function HomePage() {
  const features = [
    {
      title: 'Complex Ecological Modeling',
      description: 'Model both trophic and non-trophic interactions in ecological food webs with scientific accuracy.',
      icon: <EcoIcon fontSize="large" color="primary" />,
      link: '/simulation'
    },
    {
      title: 'Dynamic Simulations',
      description: 'Run time-based simulations to observe how species populations evolve under different scenarios.',
      icon: <BiotechIcon fontSize="large" color="primary" />,
      link: '/simulation'
    },
    {
      title: 'Data Visualization',
      description: 'Visualize complex ecological networks and analyze simulation results with interactive charts.',
      icon: <BarChartIcon fontSize="large" color="primary" />,
      link: '/simulation'
    },
    {
      title: 'Research Documentation',
      description: 'Access comprehensive documentation on ecological concepts and model assumptions.',
      icon: <MenuBookIcon fontSize="large" color="primary" />,
      link: '/documentation'
    }
  ];

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Paper 
        elevation={0}
        sx={{
          position: 'relative',
          backgroundColor: 'transparent',
          color: 'text.primary',
          mb: 4,
          mt: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          py: 6
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Ecological Food Web Simulator
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            A research-grade tool for modeling and simulating complex ecological interactions
            in food webs, supporting both trophic and non-trophic relationships.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/simulation"
              sx={{ mx: 1 }}
            >
              Start Simulation
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              component={RouterLink}
              to="/documentation"
              sx={{ mx: 1 }}
            >
              Learn More
            </Button>
          </Box>
        </Container>
      </Paper>

      {/* Features Section */}
      <Typography variant="h3" align="center" gutterBottom sx={{ mt: 8, mb: 4 }}>
        Key Features
      </Typography>
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {features.map((feature, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 3,
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
                {feature.icon}
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2" align="center">
                  {feature.title}
                </Typography>
                <Typography align="center">
                  {feature.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button size="small" color="primary" component={RouterLink} to={feature.link}>
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* About Section */}
      <Paper elevation={1} sx={{ p: 4, mb: 8 }}>
        <Typography variant="h3" gutterBottom>
          About the Project
        </Typography>
        <Typography paragraph>
          The Ecological Food Web Simulator is designed for researchers, educators, and students
          to explore the complex dynamics of ecological systems. Our tool allows you to model
          various types of species interactions including predation, competition, mutualism,
          and many more.
        </Typography>
        <Typography paragraph>
          With our simulator, you can create custom food webs, adjust parameters, and run
          dynamic simulations to observe how changes in one part of the ecosystem affect the
          entire network. The tool is built on established ecological principles and mathematical
          models, making it suitable for both educational purposes and serious research.
        </Typography>
        <Typography>
          Whether you're studying trophic cascades, testing hypotheses about ecosystem stability,
          or exploring the effects of species extinction, our simulator provides the tools you need
          for in-depth ecological analysis.
        </Typography>
      </Paper>
    </Container>
  );
}

export default HomePage;