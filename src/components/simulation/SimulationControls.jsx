import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

// Icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WaterIcon from '@mui/icons-material/Water';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AirIcon from '@mui/icons-material/Air';
import InfoIcon from '@mui/icons-material/Info';

const SimulationControls = ({
  status,
  time,
  speed,
  environmentalFactors,
  onStart,
  onPause,
  onReset,
  onSpeedChange,
  onEnvironmentalFactorChange,
  onSave,
  onLoad,
  onExport,
  onImport
}) => {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);
  const [simulationName, setSimulationName] = useState('');
  const [savedSimulations, setSavedSimulations] = useState([
    { id: 1, name: 'Forest Ecosystem', date: '2023-11-15' },
    { id: 2, name: 'Marine Food Web', date: '2023-11-10' },
    { id: 3, name: 'Grassland Community', date: '2023-11-05' },
  ]);
  const [selectedSimulation, setSelectedSimulation] = useState(null);
  
  // Handle opening the save dialog
  const handleOpenSaveDialog = () => {
    setSimulationName('');
    setSaveDialogOpen(true);
  };
  
  // Handle closing the save dialog
  const handleCloseSaveDialog = () => {
    setSaveDialogOpen(false);
  };
  
  // Handle saving the simulation
  const handleSaveSimulation = () => {
    onSave(simulationName);
    handleCloseSaveDialog();
  };
  
  // Handle opening the load dialog
  const handleOpenLoadDialog = () => {
    setSelectedSimulation(null);
    setLoadDialogOpen(true);
  };
  
  // Handle closing the load dialog
  const handleCloseLoadDialog = () => {
    setLoadDialogOpen(false);
  };
  
  // Handle loading a simulation
  const handleLoadSimulation = () => {
    if (selectedSimulation) {
      onLoad(selectedSimulation.id);
      handleCloseLoadDialog();
    }
  };
  
  // Format time display
  const formatTime = (time) => {
    const days = Math.floor(time);
    const hours = Math.floor((time - days) * 24);
    return `Day ${days}, Hour ${hours}`;
  };
  
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Simulation Status */}
      <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Simulation Status
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <Typography variant="body2">
              <strong>Status:</strong> {status.charAt(0).toUpperCase() + status.slice(1)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">
              <strong>Time:</strong> {formatTime(time)}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Simulation Controls */}
      <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Simulation Controls
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Tooltip title="Start Simulation">
            <span>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PlayArrowIcon />}
                onClick={onStart}
                disabled={status === 'running'}
              >
                Start
              </Button>
            </span>
          </Tooltip>
          
          <Tooltip title="Pause Simulation">
            <span>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<PauseIcon />}
                onClick={onPause}
                disabled={status !== 'running'}
              >
                Pause
              </Button>
            </span>
          </Tooltip>
          
          <Tooltip title="Reset Simulation">
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<RestartAltIcon />}
              onClick={onReset}
            >
              Reset
            </Button>
          </Tooltip>
        </Box>
        
        <Typography gutterBottom>Simulation Speed</Typography>
        <Slider
          value={speed}
          onChange={(e, value) => onSpeedChange(value)}
          min={0.1}
          max={10}
          step={0.1}
          valueLabelDisplay="auto"
          marks={[
            { value: 0.1, label: 'Slow' },
            { value: 1, label: 'Normal' },
            { value: 10, label: 'Fast' },
          ]}
        />
      </Paper>
      
      {/* Environmental Factors */}
      <Paper elevation={1} sx={{ p: 2, mb: 2, flexGrow: 1, overflow: 'auto' }}>
        <Typography variant="h6" gutterBottom>
          Environmental Factors
        </Typography>
        
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ThermostatIcon sx={{ mr: 1, color: '#e74c3c' }} />
              <Typography>Temperature</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography gutterBottom>Current: {environmentalFactors.temperature.current}°C</Typography>
            <Slider
              value={environmentalFactors.temperature.current}
              onChange={(e, value) => onEnvironmentalFactorChange('temperature', { ...environmentalFactors.temperature, current: value })}
              min={-20}
              max={50}
              step={0.5}
              valueLabelDisplay="auto"
              marks={[
                { value: -20, label: '-20°C' },
                { value: 15, label: '15°C' },
                { value: 50, label: '50°C' },
              ]}
            />
            
            <Box sx={{ mt: 2 }}>
              <Typography gutterBottom>Seasonal Variation</Typography>
              <FormControl fullWidth size="small">
                <InputLabel>Variation Type</InputLabel>
                <Select
                  value={environmentalFactors.temperature.variation.type}
                  onChange={(e) => onEnvironmentalFactorChange('temperature', {
                    ...environmentalFactors.temperature,
                    variation: { ...environmentalFactors.temperature.variation, type: e.target.value }
                  })}
                  label="Variation Type"
                >
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="seasonal">Seasonal</MenuItem>
                  <MenuItem value="random">Random Fluctuations</MenuItem>
                  <MenuItem value="trend">Long-term Trend</MenuItem>
                </Select>
              </FormControl>
              
              {environmentalFactors.temperature.variation.type !== 'none' && (
                <Slider
                  sx={{ mt: 2 }}
                  value={environmentalFactors.temperature.variation.amplitude}
                  onChange={(e, value) => onEnvironmentalFactorChange('temperature', {
                    ...environmentalFactors.temperature,
                    variation: { ...environmentalFactors.temperature.variation, amplitude: value }
                  })}
                  min={0}
                  max={20}
                  step={0.5}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 0, label: '0°C' },
                    { value: 10, label: '10°C' },
                    { value: 20, label: '20°C' },
                  ]}
                />
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <WaterIcon sx={{ mr: 1, color: '#3498db' }} />
              <Typography>Precipitation</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography gutterBottom>Current: {environmentalFactors.precipitation.current} mm/day</Typography>
            <Slider
              value={environmentalFactors.precipitation.current}
              onChange={(e, value) => onEnvironmentalFactorChange('precipitation', { ...environmentalFactors.precipitation, current: value })}
              min={0}
              max={50}
              step={0.5}
              valueLabelDisplay="auto"
              marks={[
                { value: 0, label: '0 mm' },
                { value: 25, label: '25 mm' },
                { value: 50, label: '50 mm' },
              ]}
            />
            
            <Box sx={{ mt: 2 }}>
              <Typography gutterBottom>Seasonal Variation</Typography>
              <FormControl fullWidth size="small">
                <InputLabel>Variation Type</InputLabel>
                <Select
                  value={environmentalFactors.precipitation.variation.type}
                  onChange={(e) => onEnvironmentalFactorChange('precipitation', {
                    ...environmentalFactors.precipitation,
                    variation: { ...environmentalFactors.precipitation.variation, type: e.target.value }
                  })}
                  label="Variation Type"
                >
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="seasonal">Seasonal</MenuItem>
                  <MenuItem value="random">Random Fluctuations</MenuItem>
                  <MenuItem value="trend">Long-term Trend</MenuItem>
                </Select>
              </FormControl>
              
              {environmentalFactors.precipitation.variation.type !== 'none' && (
                <Slider
                  sx={{ mt: 2 }}
                  value={environmentalFactors.precipitation.variation.amplitude}
                  onChange={(e, value) => onEnvironmentalFactorChange('precipitation', {
                    ...environmentalFactors.precipitation,
                    variation: { ...environmentalFactors.precipitation.variation, amplitude: value }
                  })}
                  min={0}
                  max={30}
                  step={0.5}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 0, label: '0 mm' },
                    { value: 15, label: '15 mm' },
                    { value: 30, label: '30 mm' },
                  ]}
                />
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <WbSunnyIcon sx={{ mr: 1, color: '#f39c12' }} />
              <Typography>Light Intensity</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography gutterBottom>Current: {environmentalFactors.light.current}%</Typography>
            <Slider
              value={environmentalFactors.light.current}
              onChange={(e, value) => onEnvironmentalFactorChange('light', { ...environmentalFactors.light, current: value })}
              min={0}
              max={100}
              step={1}
              valueLabelDisplay="auto"
              marks={[
                { value: 0, label: '0%' },
                { value: 50, label: '50%' },
                { value: 100, label: '100%' },
              ]}
            />
            
            <Box sx={{ mt: 2 }}>
              <Typography gutterBottom>Seasonal Variation</Typography>
              <FormControl fullWidth size="small">
                <InputLabel>Variation Type</InputLabel>
                <Select
                  value={environmentalFactors.light.variation.type}
                  onChange={(e) => onEnvironmentalFactorChange('light', {
                    ...environmentalFactors.light,
                    variation: { ...environmentalFactors.light.variation, type: e.target.value }
                  })}
                  label="Variation Type"
                >
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="seasonal">Seasonal</MenuItem>
                  <MenuItem value="random">Random Fluctuations</MenuItem>
                  <MenuItem value="trend">Long-term Trend</MenuItem>
                </Select>
              </FormControl>
              
              {environmentalFactors.light.variation.type !== 'none' && (
                <Slider
                  sx={{ mt: 2 }}
                  value={environmentalFactors.light.variation.amplitude}
                  onChange={(e, value) => onEnvironmentalFactorChange('light', {
                    ...environmentalFactors.light,
                    variation: { ...environmentalFactors.light.variation, amplitude: value }
                  })}
                  min={0}
                  max={50}
                  step={1}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 0, label: '0%' },
                    { value: 25, label: '25%' },
                    { value: 50, label: '50%' },
                  ]}
                />
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AirIcon sx={{ mr: 1, color: '#7f8c8d' }} />
              <Typography>Nutrient Availability</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography gutterBottom>Current: {environmentalFactors.nutrients.current}%</Typography>
            <Slider
              value={environmentalFactors.nutrients.current}
              onChange={(e, value) => onEnvironmentalFactorChange('nutrients', { ...environmentalFactors.nutrients, current: value })}
              min={0}
              max={100}
              step={1}
              valueLabelDisplay="auto"
              marks={[
                { value: 0, label: '0%' },
                { value: 50, label: '50%' },
                { value: 100, label: '100%' },
              ]}
            />
            
            <Box sx={{ mt: 2 }}>
              <Typography gutterBottom>Seasonal Variation</Typography>
              <FormControl fullWidth size="small">
                <InputLabel>Variation Type</InputLabel>
                <Select
                  value={environmentalFactors.nutrients.variation.type}
                  onChange={(e) => onEnvironmentalFactorChange('nutrients', {
                    ...environmentalFactors.nutrients,
                    variation: { ...environmentalFactors.nutrients.variation, type: e.target.value }
                  })}
                  label="Variation Type"
                >
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="seasonal">Seasonal</MenuItem>
                  <MenuItem value="random">Random Fluctuations</MenuItem>
                  <MenuItem value="trend">Long-term Trend</MenuItem>
                </Select>
              </FormControl>
              
              {environmentalFactors.nutrients.variation.type !== 'none' && (
                <Slider
                  sx={{ mt: 2 }}
                  value={environmentalFactors.nutrients.variation.amplitude}
                  onChange={(e, value) => onEnvironmentalFactorChange('nutrients', {
                    ...environmentalFactors.nutrients,
                    variation: { ...environmentalFactors.nutrients.variation, amplitude: value }
                  })}
                  min={0}
                  max={50}
                  step={1}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 0, label: '0%' },
                    { value: 25, label: '25%' },
                    { value: 50, label: '50%' },
                  ]}
                />
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      </Paper>
      
      {/* Save/Load/Export Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
        <Button
          variant="outlined"
          startIcon={<SaveIcon />}
          onClick={handleOpenSaveDialog}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          startIcon={<FileUploadIcon />}
          onClick={handleOpenLoadDialog}
        >
          Load
        </Button>
        <Button
          variant="outlined"
          startIcon={<FileDownloadIcon />}
          onClick={onExport}
        >
          Export
        </Button>
      </Box>
      
      {/* Save Dialog */}
      <Dialog open={saveDialogOpen} onClose={handleCloseSaveDialog}>
        <DialogTitle>Save Simulation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a name for your simulation. This will save the current state of your food web and all simulation parameters.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Simulation Name"
            fullWidth
            variant="outlined"
            value={simulationName}
            onChange={(e) => setSimulationName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSaveDialog}>Cancel</Button>
          <Button 
            onClick={handleSaveSimulation} 
            variant="contained" 
            color="primary"
            disabled={!simulationName}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Load Dialog */}
      <Dialog open={loadDialogOpen} onClose={handleCloseLoadDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Load Simulation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select a saved simulation to load. This will replace your current food web and simulation parameters.
          </DialogContentText>
          <List sx={{ mt: 2 }}>
            {savedSimulations.map((sim) => (
              <ListItem 
                key={sim.id} 
                button 
                selected={selectedSimulation?.id === sim.id}
                onClick={() => setSelectedSimulation(sim)}
                sx={{ 
                  border: '1px solid #ddd', 
                  borderRadius: 1, 
                  mb: 1,
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                    borderColor: 'primary.main',
                  }
                }}
              >
                <ListItemText 
                  primary={sim.name}
                  secondary={`Saved on: ${sim.date}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLoadDialog}>Cancel</Button>
          <Button 
            onClick={handleLoadSimulation} 
            variant="contained" 
            color="primary"
            disabled={!selectedSimulation}
          >
            Load
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SimulationControls;