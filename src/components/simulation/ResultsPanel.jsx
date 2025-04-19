import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import InfoIcon from '@mui/icons-material/Info';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// We would use a charting library like Chart.js or D3.js for visualization
// For this example, we'll create placeholder components

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`results-tabpanel-${index}`}
      aria-labelledby={`results-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `results-tab-${index}`,
    'aria-controls': `results-tabpanel-${index}`,
  };
}

// Placeholder for population chart
const PopulationChart = ({ data, selectedSpecies, timeRange }) => {
  return (
    <Box sx={{ height: 250, border: '1px dashed #ccc', borderRadius: 1, p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="body2" color="text.secondary">
        Population dynamics chart would be rendered here using D3.js or Chart.js.
        <br />
        Showing data for {selectedSpecies.length} species over {timeRange} time units.
      </Typography>
    </Box>
  );
};

// Placeholder for network metrics chart
const NetworkMetricsChart = ({ data, selectedMetrics, timeRange }) => {
  return (
    <Box sx={{ height: 250, border: '1px dashed #ccc', borderRadius: 1, p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="body2" color="text.secondary">
        Network metrics chart would be rendered here using D3.js or Chart.js.
        <br />
        Showing {selectedMetrics.length} metrics over {timeRange} time units.
      </Typography>
    </Box>
  );
};

// Placeholder for environmental factors chart
const EnvironmentalFactorsChart = ({ data, selectedFactors, timeRange }) => {
  return (
    <Box sx={{ height: 250, border: '1px dashed #ccc', borderRadius: 1, p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="body2" color="text.secondary">
        Environmental factors chart would be rendered here using D3.js or Chart.js.
        <br />
        Showing {selectedFactors.length} factors over {timeRange} time units.
      </Typography>
    </Box>
  );
};

const ResultsPanel = ({ results, species, time, onExport }) => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedSpecies, setSelectedSpecies] = useState([]);
  const [selectedMetrics, setSelectedMetrics] = useState(['connectance', 'avgPathLength']);
  const [selectedFactors, setSelectedFactors] = useState(['temperature', 'precipitation']);
  const [timeRange, setTimeRange] = useState('all');
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [infoDialogContent, setInfoDialogContent] = useState({ title: '', content: '' });
  
  // Initialize selected species with the first few species (if available)
  useEffect(() => {
    if (species.length > 0 && selectedSpecies.length === 0) {
      setSelectedSpecies(species.slice(0, Math.min(3, species.length)).map(s => s.id));
    }
  }, [species]);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleSpeciesChange = (event) => {
    setSelectedSpecies(event.target.value);
  };
  
  const handleMetricChange = (event) => {
    setSelectedMetrics(event.target.value);
  };
  
  const handleFactorChange = (event) => {
    setSelectedFactors(event.target.value);
  };
  
  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };
  
  const handleOpenInfoDialog = (title, content) => {
    setInfoDialogContent({ title, content });
    setInfoDialogOpen(true);
  };
  
  const handleCloseInfoDialog = () => {
    setInfoDialogOpen(false);
  };
  
  // Network metrics descriptions
  const metricsInfo = {
    connectance: 'The proportion of potential connections in a network that are actually realized.',
    avgPathLength: 'The average number of steps along the shortest paths for all possible pairs of network nodes.',
    clustering: 'The degree to which nodes in a graph tend to cluster together.',
    modularity: 'The strength of division of a network into modules or communities.',
    robustness: 'The ability of a network to maintain its basic functions when faced with perturbations.',
    nestedness: 'The degree to which the interactions of specialists are proper subsets of the interactions of generalists.',
  };
  
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="results tabs">
          <Tab label="Population Dynamics" {...a11yProps(0)} />
          <Tab label="Network Metrics" {...a11yProps(1)} />
          <Tab label="Environmental Effects" {...a11yProps(2)} />
        </Tabs>
      </Box>
      
      {/* Population Dynamics Tab */}
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="species-select-label">Species</InputLabel>
                <Select
                  labelId="species-select-label"
                  multiple
                  value={selectedSpecies}
                  onChange={handleSpeciesChange}
                  label="Species"
                  renderValue={(selected) => {
                    return selected.map(id => {
                      const speciesObj = species.find(s => s.id === id);
                      return speciesObj ? speciesObj.name : '';
                    }).join(', ');
                  }}
                >
                  {species.map((s) => (
                    <MenuItem key={s.id} value={s.id}>
                      <Checkbox checked={selectedSpecies.indexOf(s.id) > -1} />
                      {s.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="time-range-select-label">Time Range</InputLabel>
                <Select
                  labelId="time-range-select-label"
                  value={timeRange}
                  onChange={handleTimeRangeChange}
                  label="Time Range"
                >
                  <MenuItem value="all">All Time</MenuItem>
                  <MenuItem value="10">Last 10 Time Units</MenuItem>
                  <MenuItem value="50">Last 50 Time Units</MenuItem>
                  <MenuItem value="100">Last 100 Time Units</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        
        <PopulationChart 
          data={results.populationData} 
          selectedSpecies={selectedSpecies} 
          timeRange={timeRange} 
        />
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Summary Statistics
          </Typography>
          <Grid container spacing={2}>
            {selectedSpecies.map(id => {
              const speciesObj = species.find(s => s.id === id);
              if (!speciesObj) return null;
              
              // In a real implementation, these values would come from the results data
              const initialPopulation = 100;
              const finalPopulation = 120;
              const growthRate = ((finalPopulation - initialPopulation) / initialPopulation) * 100;
              const fluctuation = 15;
              
              return (
                <Grid item xs={12} sm={6} md={4} key={id}>
                  <Paper elevation={1} sx={{ p: 1.5 }}>
                    <Typography variant="subtitle2">{speciesObj.name}</Typography>
                    <Typography variant="body2">Initial: {initialPopulation}</Typography>
                    <Typography variant="body2">Final: {finalPopulation}</Typography>
                    <Typography variant="body2" color={growthRate >= 0 ? 'success.main' : 'error.main'}>
                      Growth: {growthRate.toFixed(1)}%
                    </Typography>
                    <Typography variant="body2">Fluctuation: ±{fluctuation}%</Typography>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </TabPanel>
      
      {/* Network Metrics Tab */}
      <TabPanel value={tabValue} index={1}>
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="metrics-select-label">Metrics</InputLabel>
                <Select
                  labelId="metrics-select-label"
                  multiple
                  value={selectedMetrics}
                  onChange={handleMetricChange}
                  label="Metrics"
                  renderValue={(selected) => selected.join(', ')}
                >
                  <MenuItem value="connectance">
                    <Checkbox checked={selectedMetrics.indexOf('connectance') > -1} />
                    Connectance
                    <Tooltip title="View definition">
                      <IconButton 
                        size="small" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenInfoDialog('Connectance', metricsInfo.connectance);
                        }}
                      >
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </MenuItem>
                  <MenuItem value="avgPathLength">
                    <Checkbox checked={selectedMetrics.indexOf('avgPathLength') > -1} />
                    Average Path Length
                    <Tooltip title="View definition">
                      <IconButton 
                        size="small" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenInfoDialog('Average Path Length', metricsInfo.avgPathLength);
                        }}
                      >
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </MenuItem>
                  <MenuItem value="clustering">
                    <Checkbox checked={selectedMetrics.indexOf('clustering') > -1} />
                    Clustering Coefficient
                    <Tooltip title="View definition">
                      <IconButton 
                        size="small" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenInfoDialog('Clustering Coefficient', metricsInfo.clustering);
                        }}
                      >
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </MenuItem>
                  <MenuItem value="modularity">
                    <Checkbox checked={selectedMetrics.indexOf('modularity') > -1} />
                    Modularity
                    <Tooltip title="View definition">
                      <IconButton 
                        size="small" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenInfoDialog('Modularity', metricsInfo.modularity);
                        }}
                      >
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </MenuItem>
                  <MenuItem value="robustness">
                    <Checkbox checked={selectedMetrics.indexOf('robustness') > -1} />
                    Robustness
                    <Tooltip title="View definition">
                      <IconButton 
                        size="small" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenInfoDialog('Robustness', metricsInfo.robustness);
                        }}
                      >
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </MenuItem>
                  <MenuItem value="nestedness">
                    <Checkbox checked={selectedMetrics.indexOf('nestedness') > -1} />
                    Nestedness
                    <Tooltip title="View definition">
                      <IconButton 
                        size="small" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenInfoDialog('Nestedness', metricsInfo.nestedness);
                        }}
                      >
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="time-range-select-label">Time Range</InputLabel>
                <Select
                  labelId="time-range-select-label"
                  value={timeRange}
                  onChange={handleTimeRangeChange}
                  label="Time Range"
                >
                  <MenuItem value="all">All Time</MenuItem>
                  <MenuItem value="10">Last 10 Time Units</MenuItem>
                  <MenuItem value="50">Last 50 Time Units</MenuItem>
                  <MenuItem value="100">Last 100 Time Units</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        
        <NetworkMetricsChart 
          data={results.networkMetrics} 
          selectedMetrics={selectedMetrics} 
          timeRange={timeRange} 
        />
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Current Network Properties
          </Typography>
          <Grid container spacing={2}>
            {selectedMetrics.map(metric => {
              // In a real implementation, these values would come from the results data
              const value = Math.random().toFixed(3);
              const trend = Math.random() > 0.5 ? 'increasing' : 'decreasing';
              
              return (
                <Grid item xs={12} sm={6} md={4} key={metric}>
                  <Paper elevation={1} sx={{ p: 1.5 }}>
                    <Typography variant="subtitle2">
                      {metric.charAt(0).toUpperCase() + metric.slice(1).replace(/([A-Z])/g, ' $1')}
                      <Tooltip title={metricsInfo[metric]}>
                        <IconButton size="small">
                          <InfoIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Typography>
                    <Typography variant="body2">Value: {value}</Typography>
                    <Typography 
                      variant="body2" 
                      color={trend === 'increasing' ? 'success.main' : 'error.main'}
                    >
                      Trend: {trend}
                    </Typography>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </TabPanel>
      
      {/* Environmental Effects Tab */}
      <TabPanel value={tabValue} index={2}>
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="factors-select-label">Environmental Factors</InputLabel>
                <Select
                  labelId="factors-select-label"
                  multiple
                  value={selectedFactors}
                  onChange={handleFactorChange}
                  label="Environmental Factors"
                  renderValue={(selected) => selected.join(', ')}
                >
                  <MenuItem value="temperature">
                    <Checkbox checked={selectedFactors.indexOf('temperature') > -1} />
                    Temperature
                  </MenuItem>
                  <MenuItem value="precipitation">
                    <Checkbox checked={selectedFactors.indexOf('precipitation') > -1} />
                    Precipitation
                  </MenuItem>
                  <MenuItem value="light">
                    <Checkbox checked={selectedFactors.indexOf('light') > -1} />
                    Light Intensity
                  </MenuItem>
                  <MenuItem value="nutrients">
                    <Checkbox checked={selectedFactors.indexOf('nutrients') > -1} />
                    Nutrient Availability
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="time-range-select-label">Time Range</InputLabel>
                <Select
                  labelId="time-range-select-label"
                  value={timeRange}
                  onChange={handleTimeRangeChange}
                  label="Time Range"
                >
                  <MenuItem value="all">All Time</MenuItem>
                  <MenuItem value="10">Last 10 Time Units</MenuItem>
                  <MenuItem value="50">Last 50 Time Units</MenuItem>
                  <MenuItem value="100">Last 100 Time Units</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        
        <EnvironmentalFactorsChart 
          data={results.environmentalData} 
          selectedFactors={selectedFactors} 
          timeRange={timeRange} 
        />
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Species Sensitivity Analysis
          </Typography>
          <Typography variant="body2" paragraph>
            The table below shows how sensitive each species is to changes in environmental factors.
            Higher values indicate greater sensitivity.
          </Typography>
          <Paper elevation={1} sx={{ p: 1.5, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Species</th>
                  {selectedFactors.map(factor => (
                    <th key={factor} style={{ textAlign: 'center', padding: '8px', borderBottom: '1px solid #ddd' }}>
                      {factor.charAt(0).toUpperCase() + factor.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {species.slice(0, 5).map(s => (
                  <tr key={s.id}>
                    <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{s.name}</td>
                    {selectedFactors.map(factor => {
                      // In a real implementation, these values would come from the results data
                      const sensitivity = (Math.random() * 5).toFixed(1);
                      let color = '#777';
                      if (sensitivity > 3.5) color = '#e74c3c';
                      else if (sensitivity > 2) color = '#f39c12';
                      else color = '#27ae60';
                      
                      return (
                        <td 
                          key={`${s.id}-${factor}`} 
                          style={{ 
                            textAlign: 'center', 
                            padding: '8px', 
                            borderBottom: '1px solid #eee',
                            color: color,
                            fontWeight: sensitivity > 3.5 ? 'bold' : 'normal'
                          }}
                        >
                          {sensitivity}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </Paper>
        </Box>
      </TabPanel>
      
      {/* Export Button */}
      <Box sx={{ mt: 'auto', pt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          startIcon={<FileDownloadIcon />}
          onClick={() => onExport(tabValue === 0 ? 'population' : tabValue === 1 ? 'network' : 'environmental')}
        >
          Export Data
        </Button>
      </Box>
      
      {/* Info Dialog */}
      <Dialog open={infoDialogOpen} onClose={handleCloseInfoDialog}>
        <DialogTitle>{infoDialogContent.title}</DialogTitle>
        <DialogContent>
          <Typography>{infoDialogContent.content}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInfoDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ResultsPanel;