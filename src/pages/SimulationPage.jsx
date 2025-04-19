import React, { useState, useEffect, useRef } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';

// Import the ForceGraph component (we'll create this later)
import FoodWebGraph from '../components/simulation/FoodWebGraph';
import SpeciesPanel from '../components/simulation/SpeciesPanel';
import InteractionPanel from '../components/simulation/InteractionPanel';
import SimulationControls from '../components/simulation/SimulationControls';
import ResultsPanel from '../components/simulation/ResultsPanel';

// Import simulation engine (we'll create this later)
import { useSimulationEngine } from '../hooks/useSimulationEngine';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simulation-tabpanel-${index}`}
      aria-labelledby={`simulation-tab-${index}`}
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
    id: `simulation-tab-${index}`,
    'aria-controls': `simulation-tabpanel-${index}`,
  };
}

function SimulationPage() {
  // State for the active tab
  const [tabValue, setTabValue] = useState(0);
  
  // Simulation state
  const {
    foodWeb,
    simulationStatus,
    simulationResults,
    simulationTime,
    simulationSpeed,
    environmentalFactors,
    startSimulation,
    pauseSimulation,
    resetSimulation,
    setSimulationSpeed,
    addSpecies,
    removeSpecies,
    updateSpecies,
    addInteraction,
    removeInteraction,
    updateInteraction,
    updateEnvironmentalFactor,
    exportData,
    importData,
    saveSimulation,
    loadSimulation
  } = useSimulationEngine();

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Ecological Food Web Simulator
      </Typography>
      
      <Grid container spacing={3}>
        {/* Main visualization area */}
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column',
              height: 600 
            }}
          >
            <Typography variant="h6" gutterBottom>
              Food Web Network
            </Typography>
            <Box sx={{ flexGrow: 1, position: 'relative' }}>
              <FoodWebGraph 
                data={foodWeb} 
                simulationStatus={simulationStatus}
                onAddInteraction={addInteraction}
                onRemoveInteraction={removeInteraction}
              />
            </Box>
          </Paper>
        </Grid>
        
        {/* Control panel */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 0, 
              display: 'flex', 
              flexDirection: 'column',
              height: 600 
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                aria-label="simulation tabs"
                variant="fullWidth"
              >
                <Tab label="Species" {...a11yProps(0)} />
                <Tab label="Interactions" {...a11yProps(1)} />
                <Tab label="Simulation" {...a11yProps(2)} />
                <Tab label="Results" {...a11yProps(3)} />
              </Tabs>
            </Box>
            
            <TabPanel value={tabValue} index={0}>
              <SpeciesPanel 
                species={foodWeb.nodes}
                onAddSpecies={addSpecies}
                onRemoveSpecies={removeSpecies}
                onUpdateSpecies={updateSpecies}
              />
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              <InteractionPanel 
                interactions={foodWeb.links}
                species={foodWeb.nodes}
                onAddInteraction={addInteraction}
                onRemoveInteraction={removeInteraction}
                onUpdateInteraction={updateInteraction}
              />
            </TabPanel>
            
            <TabPanel value={tabValue} index={2}>
              <SimulationControls 
                status={simulationStatus}
                time={simulationTime}
                speed={simulationSpeed}
                environmentalFactors={environmentalFactors}
                onStart={startSimulation}
                onPause={pauseSimulation}
                onReset={resetSimulation}
                onSpeedChange={setSimulationSpeed}
                onEnvironmentalFactorChange={updateEnvironmentalFactor}
                onSave={saveSimulation}
                onLoad={loadSimulation}
                onExport={exportData}
                onImport={importData}
              />
            </TabPanel>
            
            <TabPanel value={tabValue} index={3}>
              <ResultsPanel 
                results={simulationResults}
                species={foodWeb.nodes}
                time={simulationTime}
                onExport={exportData}
              />
            </TabPanel>
          </Paper>
        </Grid>
        
        {/* Simulation status bar */}
        <Grid item xs={12}>
          <Paper 
            elevation={1} 
            sx={{ 
              p: 2, 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center' 
            }}
          >
            <Typography variant="body2">
              Simulation Time: {simulationTime.toFixed(2)} units
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title="Start Simulation">
                <IconButton 
                  color="primary" 
                  onClick={startSimulation}
                  disabled={simulationStatus === 'running'}
                >
                  <PlayArrowIcon />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Pause Simulation">
                <IconButton 
                  color="primary" 
                  onClick={pauseSimulation}
                  disabled={simulationStatus !== 'running'}
                >
                  <PauseIcon />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Reset Simulation">
                <IconButton color="primary" onClick={resetSimulation}>
                  <RestartAltIcon />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Save Simulation">
                <IconButton color="primary" onClick={saveSimulation}>
                  <SaveIcon />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Export Data">
                <IconButton color="primary" onClick={exportData}>
                  <FileDownloadIcon />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Import Data">
                <IconButton color="primary" onClick={importData}>
                  <FileUploadIcon />
                </IconButton>
              </Tooltip>
            </Box>
            
            <Typography variant="body2">
              Status: {simulationStatus.charAt(0).toUpperCase() + simulationStatus.slice(1)}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SimulationPage;