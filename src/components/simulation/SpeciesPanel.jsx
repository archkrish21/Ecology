import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PetsIcon from '@mui/icons-material/Pets';
import GrassIcon from '@mui/icons-material/Grass';
import WaterIcon from '@mui/icons-material/Water';
import { v4 as uuidv4 } from 'uuid';

// Define colors for different trophic levels
const TROPHIC_COLORS = {
  producer: '#27ae60', // green
  primary_consumer: '#f39c12', // orange
  secondary_consumer: '#e74c3c', // red
  tertiary_consumer: '#8e44ad', // purple
  decomposer: '#3498db', // blue
};

const SpeciesPanel = ({ species, onAddSpecies, onRemoveSpecies, onUpdateSpecies }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    scientificName: '',
    trophicLevel: 'producer',
    taxonomy: '',
    biomass: 1.0,
    growthRate: 0.1,
    mortalityRate: 0.05,
    metabolicRate: 0.2,
    description: '',
    temperatureTolerance: { min: 5, max: 35 },
    moistureTolerance: { min: 20, max: 80 },
    habitat: [],
  });
  
  // Handle opening the add/edit dialog
  const handleOpenDialog = (species = null) => {
    if (species) {
      // Edit existing species
      setFormData({
        ...species,
        // Ensure all required properties exist
        temperatureTolerance: species.temperatureTolerance || { min: 5, max: 35 },
        moistureTolerance: species.moistureTolerance || { min: 20, max: 80 },
        habitat: species.habitat || [],
      });
      setSelectedSpecies(species);
    } else {
      // Add new species
      setFormData({
        id: uuidv4(),
        name: '',
        scientificName: '',
        trophicLevel: 'producer',
        taxonomy: '',
        biomass: 1.0,
        growthRate: 0.1,
        mortalityRate: 0.05,
        metabolicRate: 0.2,
        description: '',
        temperatureTolerance: { min: 5, max: 35 },
        moistureTolerance: { min: 20, max: 80 },
        habitat: [],
      });
      setSelectedSpecies(null);
    }
    setDialogOpen(true);
  };
  
  // Handle closing the dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  // Handle slider changes for tolerances
  const handleToleranceChange = (type, values) => {
    setFormData({
      ...formData,
      [type]: { min: values[0], max: values[1] },
    });
  };
  
  // Handle saving the species
  const handleSaveSpecies = () => {
    if (selectedSpecies) {
      // Update existing species
      onUpdateSpecies(formData);
    } else {
      // Add new species
      onAddSpecies(formData);
    }
    handleCloseDialog();
  };
  
  // Handle opening the confirm delete dialog
  const handleOpenConfirmDialog = (species) => {
    setSelectedSpecies(species);
    setConfirmDialogOpen(true);
  };
  
  // Handle closing the confirm delete dialog
  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };
  
  // Handle deleting a species
  const handleDeleteSpecies = () => {
    onRemoveSpecies(selectedSpecies.id);
    handleCloseConfirmDialog();
  };
  
  // Filter species based on search term
  const filteredSpecies = species.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get icon based on trophic level
  const getTrophicIcon = (trophicLevel) => {
    switch (trophicLevel) {
      case 'producer':
        return <GrassIcon />;
      case 'decomposer':
        return <WaterIcon />;
      default:
        return <PetsIcon />;
    }
  };
  
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Species</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          size="small"
        >
          Add Species
        </Button>
      </Box>
      
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        label="Search Species"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />
      
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {filteredSpecies.length === 0 ? (
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
            No species found. Add your first species to begin building your food web.
          </Typography>
        ) : (
          <List dense>
            {filteredSpecies.map((s) => (
              <React.Fragment key={s.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: TROPHIC_COLORS[s.trophicLevel] || '#777' }}>
                      {getTrophicIcon(s.trophicLevel)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={s.name}
                    secondary={
                      <>
                        <em>{s.scientificName}</em>
                        <br />
                        Biomass: {s.biomass.toFixed(2)} kg/m²
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleOpenDialog(s)} size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleOpenConfirmDialog(s)} size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
      
      {/* Add/Edit Species Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedSpecies ? 'Edit Species' : 'Add New Species'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {/* Basic Information */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="dense"
                name="name"
                label="Common Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="dense"
                name="scientificName"
                label="Scientific Name"
                value={formData.scientificName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Trophic Level</InputLabel>
                <Select
                  name="trophicLevel"
                  value={formData.trophicLevel}
                  onChange={handleInputChange}
                  label="Trophic Level"
                >
                  <MenuItem value="producer">Producer</MenuItem>
                  <MenuItem value="primary_consumer">Primary Consumer</MenuItem>
                  <MenuItem value="secondary_consumer">Secondary Consumer</MenuItem>
                  <MenuItem value="tertiary_consumer">Tertiary Consumer</MenuItem>
                  <MenuItem value="decomposer">Decomposer</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="dense"
                name="taxonomy"
                label="Taxonomy"
                value={formData.taxonomy}
                onChange={handleInputChange}
                helperText="e.g., Mammal, Bird, Plant, Fungi"
              />
            </Grid>
            
            {/* Ecological Parameters */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Ecological Parameters
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>Biomass (kg/m²)</Typography>
              <Slider
                value={formData.biomass}
                onChange={(e, value) => setFormData({ ...formData, biomass: value })}
                min={0.1}
                max={100}
                step={0.1}
                valueLabelDisplay="auto"
                marks={[
                  { value: 0.1, label: '0.1' },
                  { value: 50, label: '50' },
                  { value: 100, label: '100' },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>Growth Rate</Typography>
              <Slider
                value={formData.growthRate}
                onChange={(e, value) => setFormData({ ...formData, growthRate: value })}
                min={0}
                max={1}
                step={0.01}
                valueLabelDisplay="auto"
                marks={[
                  { value: 0, label: '0' },
                  { value: 0.5, label: '0.5' },
                  { value: 1, label: '1' },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>Mortality Rate</Typography>
              <Slider
                value={formData.mortalityRate}
                onChange={(e, value) => setFormData({ ...formData, mortalityRate: value })}
                min={0}
                max={1}
                step={0.01}
                valueLabelDisplay="auto"
                marks={[
                  { value: 0, label: '0' },
                  { value: 0.5, label: '0.5' },
                  { value: 1, label: '1' },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>Metabolic Rate</Typography>
              <Slider
                value={formData.metabolicRate}
                onChange={(e, value) => setFormData({ ...formData, metabolicRate: value })}
                min={0}
                max={1}
                step={0.01}
                valueLabelDisplay="auto"
                marks={[
                  { value: 0, label: '0' },
                  { value: 0.5, label: '0.5' },
                  { value: 1, label: '1' },
                ]}
              />
            </Grid>
            
            {/* Environmental Tolerances */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Environmental Tolerances
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>Temperature Range (°C)</Typography>
              <Slider
                value={[formData.temperatureTolerance.min, formData.temperatureTolerance.max]}
                onChange={(e, values) => handleToleranceChange('temperatureTolerance', values)}
                min={-20}
                max={50}
                step={1}
                valueLabelDisplay="auto"
                marks={[
                  { value: -20, label: '-20°C' },
                  { value: 15, label: '15°C' },
                  { value: 50, label: '50°C' },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>Moisture Range (%)</Typography>
              <Slider
                value={[formData.moistureTolerance.min, formData.moistureTolerance.max]}
                onChange={(e, values) => handleToleranceChange('moistureTolerance', values)}
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
            </Grid>
            
            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="dense"
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSaveSpecies} 
            variant="contained" 
            color="primary"
            disabled={!formData.name || !formData.scientificName}
          >
            {selectedSpecies ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDialogOpen} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the species "{selectedSpecies?.name}"? This action cannot be undone and will remove all interactions involving this species.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
          <Button onClick={handleDeleteSpecies} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SpeciesPanel;