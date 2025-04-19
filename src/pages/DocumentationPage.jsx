import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ScienceIcon from '@mui/icons-material/Science';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CodeIcon from '@mui/icons-material/Code';
import EcoIcon from '@mui/icons-material/Eco';
import BiotechIcon from '@mui/icons-material/Biotech';
import PetsIcon from '@mui/icons-material/Pets';
import GrassIcon from '@mui/icons-material/Grass';
import WaterIcon from '@mui/icons-material/Water';
import AirIcon from '@mui/icons-material/Air';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`documentation-tabpanel-${index}`}
      aria-labelledby={`documentation-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `documentation-tab-${index}`,
    'aria-controls': `documentation-tabpanel-${index}`,
  };
}

function DocumentationPage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Documentation
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab icon={<MenuBookIcon />} label="User Guide" {...a11yProps(0)} />
          <Tab icon={<ScienceIcon />} label="Ecological Concepts" {...a11yProps(1)} />
          <Tab icon={<CodeIcon />} label="Technical Reference" {...a11yProps(2)} />
          <Tab icon={<HelpOutlineIcon />} label="FAQ" {...a11yProps(3)} />
        </Tabs>
      </Paper>

      {/* User Guide Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, position: 'sticky', top: 20 }}>
              <Typography variant="h6" gutterBottom>
                Contents
              </Typography>
              <List component="nav" dense>
                <ListItem button>
                  <ListItemText primary="Getting Started" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Creating a Food Web" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Adding Species" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Defining Interactions" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Running Simulations" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Analyzing Results" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Saving and Exporting" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Advanced Features" />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={9}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Getting Started
              </Typography>
              <Typography paragraph>
                Welcome to the Ecological Food Web Simulator! This tool allows you to create, visualize, and simulate complex ecological networks with both trophic and non-trophic interactions. This user guide will walk you through the basic features and functionality of the simulator.
              </Typography>

              <Box sx={{ my: 3 }}>
                <img 
                  src="/documentation/interface-overview.jpg" 
                  alt="Interface Overview" 
                  style={{ width: '100%', borderRadius: '4px', border: '1px solid #ddd' }}
                />
                <Typography variant="caption" display="block" align="center" sx={{ mt: 1 }}>
                  Figure 1: Overview of the simulator interface
                </Typography>
              </Box>

              <Typography variant="h6" gutterBottom>
                Basic Workflow
              </Typography>
              <Typography paragraph>
                The typical workflow for using the simulator involves the following steps:
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <EcoIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="1. Create or load a food web model" 
                    secondary="Start with a blank canvas or load a pre-existing model from the library."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PetsIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="2. Add species to your model" 
                    secondary="Define species with properties like biomass, growth rate, and environmental tolerances."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <GrassIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="3. Define interactions between species" 
                    secondary="Create trophic and non-trophic relationships between species in your web."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BiotechIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="4. Configure simulation parameters" 
                    secondary="Set environmental conditions, time steps, and other simulation settings."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ScienceIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="5. Run the simulation" 
                    secondary="Execute the model and observe how species populations change over time."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CodeIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="6. Analyze and export results" 
                    secondary="Examine simulation outcomes and export data for further analysis."
                  />
                </ListItem>
              </List>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h5" gutterBottom>
                Creating a Food Web
              </Typography>
              <Typography paragraph>
                To create a new food web, navigate to the Simulation page and click the "New Food Web" button. You'll be presented with a blank canvas where you can start building your ecological network.
              </Typography>
              <Typography paragraph>
                Alternatively, you can load one of our template food webs to get started quickly. These templates represent common ecological systems like forest, marine, or grassland ecosystems.
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h5" gutterBottom>
                Adding Species
              </Typography>
              <Typography paragraph>
                Species are the fundamental building blocks of your food web. Each species is represented as a node in the network visualization.
              </Typography>
              <Typography paragraph>
                To add a species to your food web:
              </Typography>
              <ol>
                <li>Click the "Species" tab in the control panel</li>
                <li>Click the "Add Species" button</li>
                <li>Fill in the species properties in the form that appears</li>
                <li>Click "Save" to add the species to your food web</li>
              </ol>
              <Typography paragraph>
                You can also import species from the Species Library by navigating to the Species Library page, finding the species you want to add, and clicking "Add to Simulation".
              </Typography>

              <Box sx={{ my: 3 }}>
                <img 
                  src="/documentation/species-properties.jpg" 
                  alt="Species Properties Form" 
                  style={{ width: '100%', borderRadius: '4px', border: '1px solid #ddd' }}
                />
                <Typography variant="caption" display="block" align="center" sx={{ mt: 1 }}>
                  Figure 2: Species properties form
                </Typography>
              </Box>

              {/* Additional sections would continue here */}
              <Divider sx={{ my: 3 }} />

              <Typography variant="h5" gutterBottom>
                Defining Interactions
              </Typography>
              <Typography paragraph>
                Interactions define how species affect each other. Go to the "Interactions" tab in the control panel to manage relationships.
              </Typography>
              <ol>
                <li>Click the "Add Interaction" button.</li>
                <li>Select the source and target species.</li>
                <li>Choose the interaction type (e.g., Predation, Competition, Mutualism).</li>
                <li>Adjust the interaction strength and add any specific parameters.</li>
                <li>Click "Save".</li>
              </ol>
              <Typography paragraph>
                Both trophic (feeding) and non-trophic interactions can be modeled. See the Ecological Concepts tab for more details on interaction types.
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h5" gutterBottom>
                Running Simulations
              </Typography>
              <Typography paragraph>
                Once your food web is set up, you can run simulations to observe its dynamics over time. Use the Simulation Controls panel:
              </Typography>
              <ul>
                <li>Set initial environmental conditions (temperature, moisture, etc.).</li>
                <li>Configure simulation parameters like duration and time step.</li>
                <li>Click the "Start" button to begin the simulation.</li>
                <li>Use the "Pause" and "Reset" buttons as needed.</li>
                <li>Adjust the simulation speed using the slider.</li>
              </ul>
              <Typography paragraph>
                The visualization panel will update in real-time (depending on speed) showing changes in species populations and interactions.
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h5" gutterBottom>
                Analyzing Results
              </Typography>
              <Typography paragraph>
                After running a simulation, you can analyze the results using the built-in charts and data tables.
              </Typography>
              <ul>
                <li>View population trends over time for individual species or groups.</li>
                <li>Examine changes in interaction strengths.</li>
                <li>Analyze ecosystem metrics like biodiversity indices or stability measures.</li>
                <li>Compare results from different simulation runs or scenarios.</li>
              </ul>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h5" gutterBottom>
                Saving and Exporting
              </Typography>
              <Typography paragraph>
                You can save your food web model and simulation results for later use or sharing.
              </Typography>
              <ul>
                <li>Use the "Save Simulation" button in the controls panel to save the current state (species, interactions, parameters).</li>
                <li>Load previously saved simulations using the "Load Simulation" button.</li>
                <li>Export simulation data (e.g., population time series) to CSV or other formats for external analysis using the "Export Data" button.</li>
                <li>Import food web structures or species lists using the "Import" features.</li>
              </ul>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h5" gutterBottom>
                Advanced Features
              </Typography>
              <Typography paragraph>
                Explore advanced features for more complex modeling:
              </Typography>
              <ul>
                <li>Stochastic simulations to incorporate randomness.</li>
                <li>Spatial modeling (if available) to simulate habitat effects.</li>
                <li>Sensitivity analysis to understand parameter impacts.</li>
                <li>Integration with external environmental data sources.</li>
              </ul>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Ecological Concepts Tab */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, position: 'sticky', top: 20 }}>
              <Typography variant="h6" gutterBottom>
                Contents
              </Typography>
              <List component="nav" dense>
                <ListItem button>
                  <ListItemText primary="Food Web Basics" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Trophic Levels" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Trophic Interactions" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Non-Trophic Interactions" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Population Dynamics" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Ecosystem Stability" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Environmental Factors" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Evolutionary Dynamics" />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={9}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Food Web Basics
              </Typography>
              <Typography paragraph>
                A food web is a network representation of feeding relationships within an ecological community. Unlike a simple food chain, which shows a linear sequence of who eats whom, a food web captures the complex interconnections between multiple species across different trophic levels.
              </Typography>
              <Typography paragraph>
                Food webs help ecologists understand energy flow, nutrient cycling, and the potential consequences of species loss or introduction within ecosystems.
              </Typography>

              <Box sx={{ my: 3 }}>
                <img 
                  src="/documentation/food-web-example.jpg" 
                  alt="Food Web Example" 
                  style={{ width: '100%', borderRadius: '4px', border: '1px solid #ddd' }}
                />
                <Typography variant="caption" display="block" align="center" sx={{ mt: 1 }}>
                  Figure 1: Example of a complex food web showing multiple trophic levels and interactions
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h5" gutterBottom>
                Trophic Levels
              </Typography>
              <Typography paragraph>
                Trophic levels represent the position of organisms in a food chain. Each level is defined by how many energy transfers separate it from the basic input of energy into the ecosystem.
              </Typography>

              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} md={6}>
                  <Paper elevation={1} sx={{ p: 2, bgcolor: '#f1f8e9' }}>
                    <Typography variant="h6" gutterBottom>
                      <GrassIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                      Primary Producers (Level 1)
                    </Typography>
                    <Typography variant="body2">
                      Organisms that produce their own food through photosynthesis or chemosynthesis. Examples include plants, algae, and some bacteria.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper elevation={1} sx={{ p: 2, bgcolor: '#fff8e1' }}>
                    <Typography variant="h6" gutterBottom>
                      <PetsIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                      Primary Consumers (Level 2)
                    </Typography>
                    <Typography variant="body2">
                      Herbivores that eat primary producers. Examples include deer, rabbits, and many insects.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper elevation={1} sx={{ p: 2, bgcolor: '#ffebee' }}>
                    <Typography variant="h6" gutterBottom>
                      <PetsIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                      Secondary Consumers (Level 3)
                    </Typography>
                    <Typography variant="body2">
                      Carnivores that eat primary consumers. Examples include foxes, owls, and many predatory fish.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper elevation={1} sx={{ p: 2, bgcolor: '#e8eaf6' }}>
                    <Typography variant="h6" gutterBottom>
                      <PetsIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                      Tertiary Consumers (Level 4)
                    </Typography>
                    <Typography variant="body2">
                      Top predators that eat secondary consumers. Examples include wolves, sharks, and eagles.
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper elevation={1} sx={{ p: 2, bgcolor: '#e0f2f1' }}>
                    <Typography variant="h6" gutterBottom>
                      <WaterIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                      Decomposers
                    </Typography>
                    <Typography variant="body2">
                      Organisms that break down dead organic material. Examples include fungi, bacteria, and some invertebrates. Decomposers play a crucial role in nutrient cycling.
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Typography paragraph>
                Energy is lost at each trophic level (typically 90% loss), which is why food webs typically have fewer organisms at higher trophic levels.
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h5" gutterBottom>
                Trophic Interactions
              </Typography>
              <Typography paragraph>
                Trophic interactions involve the transfer of energy and nutrients between species through feeding relationships.
              </Typography>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Predation</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography paragraph>
                    Predation occurs when one organism (the predator) hunts and consumes another organism (the prey). This interaction directly transfers energy up the food web.
                  </Typography>
                  <Typography paragraph>
                    In our simulator, predation is modeled using functional responses that describe how predator consumption rates change with prey density. Common models include:
                  </Typography>
                  <ul>
                    <li><strong>Type I:</strong> Linear relationship between prey density and consumption rate</li>
                    <li><strong>Type II:</strong> Consumption rate increases with prey density but plateaus due to handling time</li>
                    <li><strong>Type III:</strong> S-shaped curve where predators switch to alternative prey at low prey densities</li>
                  </ul>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Herbivory</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography paragraph>
                    Herbivory is a specific type of predation where animals consume plant material. This is the primary pathway by which energy from primary producers enters the food web.
                  </Typography>
                  <Typography>
                    Plants have evolved various defenses against herbivory, including physical structures (thorns, tough leaves) and chemical compounds (toxins, deterrents). These defenses can be incorporated into the simulation as factors affecting consumption rates.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Parasitism</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography paragraph>
                    Parasitism involves one organism (the parasite) living on or in another organism (the host), deriving nutrients at the host's expense. Unlike predation, parasitism typically doesn't immediately kill the host.
                  </Typography>
                  <Typography>
                    In the simulator, parasitism can be modeled as a continuous drain on host resources, potentially affecting growth rate, reproduction, or survival probability.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Detritivory</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Detritivory involves the consumption of dead organic matter (detritus). Detritivores play a crucial role in nutrient cycling and decomposition processes, breaking down complex organic molecules into simpler forms that can be reused by producers.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h5" gutterBottom>
                Non-Trophic Interactions
              </Typography>
              <Typography paragraph>
                Non-trophic interactions (NTIs) are relationships between species that do not involve direct feeding. They can significantly influence community structure and dynamics.
              </Typography>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Competition</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography paragraph>
                    Competition occurs when two or more species require the same limited resource (e.g., food, space, mates). This interaction is typically detrimental to both species involved (-/-).
                  </Typography>
                  <Typography>
                    Competition can be exploitative (indirectly consuming the same resource) or interference (directly preventing access to the resource).
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Mutualism</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography paragraph>
                    Mutualism is an interaction where both species benefit (+/+). Examples include pollination (plant and pollinator) or gut symbionts (host and microbe).
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Commensalism</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography paragraph>
                    Commensalism benefits one species while having no significant effect on the other (+/0). An example is barnacles attaching to a whale.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Amensalism</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography paragraph>
                    Amensalism harms one species while the other is unaffected (-/0). An example is allelopathy, where one plant releases chemicals that inhibit the growth of nearby plants.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Facilitation</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography paragraph>
                    Facilitation occurs when one species creates conditions that benefit another. This can be a form of mutualism or commensalism. For example, a nurse plant providing shade for a seedling.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h5" gutterBottom>
                Population Dynamics
              </Typography>
              <Typography paragraph>
                Population dynamics describe how the size and age structure of populations change over time. Key factors include birth rates, death rates, immigration, and emigration.
              </Typography>
              <Typography paragraph>
                In the simulator, population changes are driven by species-specific parameters (growth rate, mortality) and the effects of interactions (predation reducing prey, competition limiting growth, etc.). Environmental factors also play a crucial role.
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h5" gutterBottom>
                Ecosystem Stability
              </Typography>
              <Typography paragraph>
                Ecosystem stability refers to the ability of an ecosystem to persist in the face of disturbances. Key concepts include:
              </Typography>
              <ul>
                <li><strong>Resistance:</strong> The ability to withstand change without disruption.</li>
                <li><strong>Resilience:</strong> The speed at which an ecosystem recovers after a disturbance.</li>
              </ul>
              <Typography paragraph>
                Food web complexity (number of species and interactions) is often linked to stability, though the relationship is complex. The simulator allows exploring how different web structures respond to perturbations like species removal or environmental shifts.
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h5" gutterBottom>
                Environmental Factors
              </Typography>
              <Typography paragraph>
                Abiotic factors like temperature, moisture, light availability, and nutrient levels significantly impact species and their interactions.
              </Typography>
              <Typography paragraph>
                The simulator allows setting baseline environmental conditions and potentially simulating changes over time. Species have defined tolerance ranges, and conditions outside these ranges can negatively affect their growth, survival, or interaction strengths.
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h5" gutterBottom>
                Evolutionary Dynamics
              </Typography>
              <Typography paragraph>
                While this simulator primarily focuses on ecological timescales, it's important to remember that interactions drive natural selection and evolution over longer periods. Predator-prey arms races, coevolution in mutualisms, and adaptation to environmental conditions shape the traits we observe in species today.
              </Typography>
              <Typography paragraph>
                Advanced versions or extensions of such simulators might incorporate evolutionary processes, allowing traits to change over generations based on fitness outcomes within the simulated food web.
              </Typography>

            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Technical Reference Tab */}
      <TabPanel value={tabValue} index={2}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Technical Reference
          </Typography>
          <Typography paragraph>
            This section provides technical details about the simulation models, algorithms, and data structures used in the Ecological Food Web Simulator.
          </Typography>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Population Models</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                Specify the mathematical models used for population growth (e.g., logistic growth, Lotka-Volterra equations).
              </Typography>
              {/* Add details about model equations, parameters, assumptions */}
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Interaction Models</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                Detail the functional responses used for predation (Type I, II, III), competition models (e.g., R* theory), and how non-trophic interactions are implemented.
              </Typography>
              {/* Add details about interaction equations, parameter interpretations */}
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Simulation Engine</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                Describe the core simulation loop, numerical integration methods (e.g., Euler, Runge-Kutta), time step handling, and event scheduling (if applicable).
              </Typography>
              {/* Add details about implementation, performance considerations */}
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Data Structures</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                Explain how species, interactions, and the food web network are represented internally (e.g., adjacency matrices, node/edge lists).
              </Typography>
              {/* Add details about data formats for saving/loading */}
            </AccordionDetails>
          </Accordion>

          {/* Add more sections as needed: API Reference, File Formats, etc. */}
        </Paper>
      </TabPanel>

      {/* FAQ Tab */}
      <TabPanel value={tabValue} index={3}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Frequently Asked Questions (FAQ)
          </Typography>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">How do I add a custom species?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                Navigate to the "Species" tab on the Simulation page and click "Add Species", or go to the "My Species" tab in the Species Library and click "Add New Species". Fill in the required properties like name, trophic level, and initial biomass.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Can I model non-trophic interactions like competition?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                Yes. When adding or editing an interaction, select "Competition" or other non-trophic types from the interaction type dropdown. You can then specify the strength and nature of the competitive interaction.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">How is simulation speed controlled?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                Use the "Simulation Speed" slider in the Simulation Controls panel. Higher values make the simulation progress faster in real-time, but may skip visual updates. Lower values slow it down for detailed observation.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">What do the different colors in the visualization represent?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                Node colors typically represent trophic levels (e.g., green for producers, orange/red for consumers). Edge colors might represent interaction types (e.g., red for predation, blue for mutualism). Check the legend in the visualization panel for specifics.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">How can I export my simulation results?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                Use the "Export Data" button, typically found in the Simulation Controls or Results Analysis section. You can usually export data like population time series to formats like CSV.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Add more common questions and answers */}
        </Paper>
      </TabPanel>
    </Container>
  );
}

export default DocumentationPage;