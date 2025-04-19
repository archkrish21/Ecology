import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { v4 as uuidv4 } from 'uuid';

// Import the ecological interactions model
import { 
  INTERACTION_COLORS, 
  INTERACTION_TYPE_LIST, 
  isDirectionalInteraction,
  isBidirectionalInteraction,
  getInteractionDescription 
} from '../../models/EcologicalInteractions';

// Use the imported interaction colors from our model
// The original colors are kept as a reference but we'll use the imported ones

const InteractionPanel = ({ interactions, species, onAddInteraction, onRemoveInteraction, onUpdateInteraction }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedInteraction, setSelectedInteraction] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    id: '',
    source: '',
    target: '',
    interactionType: INTERACTION_TYPE_LIST[0].value, // Default to first interaction type
    strength: 0.5,
    description: '',
    seasonality: 'all_year',
    environmentalDependency: [],
  });
  
  // Handle opening the add/edit dialog
  const handleOpenDialog = (interaction = null) => {
    if (interaction) {
      // Edit existing interaction
      setFormData({
        ...interaction,
        // Ensure all required properties exist
        environmentalDependency: interaction.environmentalDependency || [],
      });
      setSelectedInteraction(interaction);
    } else {
      // Add new interaction
      setFormData({
        id: uuidv4(),
        source: '',
        target: '',
        interactionType: INTERACTION_TYPE_LIST[0].value, // Default to first interaction type
        strength: 0.5,
        description: '',
        seasonality: 'all_year',
        environmentalDependency: [],
      });
      setSelectedInteraction(null);
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
  
  // Handle saving the interaction
  const handleSaveInteraction = () => {
    if (selectedInteraction) {
      // Update existing interaction
      onUpdateInteraction(formData);
    } else {
      // Add new interaction
      onAddInteraction(formData);
    }
    handleCloseDialog();
  };
  
  // Handle opening the confirm delete dialog
  const handleOpenConfirmDialog = (interaction) => {
    setSelectedInteraction(interaction);
    setConfirmDialogOpen(true);
  };
  
  // Handle closing the confirm delete dialog
  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };
  
  // Handle deleting an interaction
  const handleDeleteInteraction = () => {
    onRemoveInteraction(selectedInteraction.id);
    handleCloseConfirmDialog();
  };
  
  // Filter interactions based on type and search term
  const filteredInteractions = interactions.filter(interaction => {
    // Filter by interaction type
    const matchesType = filterType === 'all' || interaction.interactionType === filterType;
    
    // Filter by search term (match source or target species names)
    const sourceSpecies = species.find(s => s.id === interaction.source);
    const targetSpecies = species.find(s => s.id === interaction.target);
    
    const sourceName = sourceSpecies ? sourceSpecies.name.toLowerCase() : '';
    const targetName = targetSpecies ? targetSpecies.name.toLowerCase() : '';
    
    const matchesSearch = searchTerm === '' || 
      sourceName.includes(searchTerm.toLowerCase()) || 
      targetName.includes(searchTerm.toLowerCase());
    
    return matchesType && matchesSearch;
  });
  
  // Get species name by ID
  const getSpeciesName = (id) => {
    const species_obj = species.find(s => s.id === id);
    return species_obj ? species_obj.name : 'Unknown Species';
  };
  
  // Get interaction icon based on type
  const getInteractionIcon = (type) => {
    // Use bidirectional icon for interactions that affect both species
    if (isBidirectionalInteraction(type)) {
      return <CompareArrowsIcon />;
    }
    // Use directional icon for interactions with a clear source and target
    else if (isDirectionalInteraction(type)) {
      return <ArrowForwardIcon />;
    }
    // Default icon for any other types
    else {
      return <ArrowForwardIcon />;
    }
  };
  
  // Get interaction description using our ecological interactions model
  const getInteractionDescriptionFromModel = (interaction) => {
    // Use the imported getInteractionDescription function from our model
    return getInteractionDescription(interaction, species);
  };
  
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Interactions</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          size="small"
        >
          Add Interaction
        </Button>
      </Box>
      
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label="Search Species"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel>Interaction Type</InputLabel>
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                label="Interaction Type"
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="trophic" disabled>
                  <em>-- Trophic Interactions --</em>
                </MenuItem>
                {INTERACTION_TYPE_LIST.filter(type => type.category === 'trophic').map(type => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
                <MenuItem value="non-trophic" disabled>
                  <em>-- Non-Trophic Interactions --</em>
                </MenuItem>
                {INTERACTION_TYPE_LIST.filter(type => type.category === 'non-trophic').map(type => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {filteredInteractions.length === 0 ? (
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
            No interactions found. Add interactions between species to build your food web.
          </Typography>
        ) : (
          <List dense>
            {filteredInteractions.map((interaction) => (
              <React.Fragment key={interaction.id}>
                <ListItem>
                  <ListItemIcon>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      width: 40, 
                      height: 40, 
                      borderRadius: '50%', 
                      bgcolor: INTERACTION_COLORS[interaction.interactionType] || '#777',
                      color: '#fff'
                    }}>
                      {getInteractionIcon(interaction.interactionType)}
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={getInteractionDescriptionFromModel(interaction)}
                    secondary={
                      <>
                        <Typography variant="body2" component="span">
                          Type: {interaction.interactionType.charAt(0).toUpperCase() + interaction.interactionType.slice(1)}
                        </Typography>
                        <br />
                        <Typography variant="body2" component="span">
                          Strength: {interaction.strength.toFixed(2)}
                        </Typography>
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleOpenDialog(interaction)} size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleOpenConfirmDialog(interaction)} size="small">
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
      
      {/* Add/Edit Interaction Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedInteraction ? 'Edit Interaction' : 'Add New Interaction'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {/* Basic Information */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Source Species</InputLabel>
                <Select
                  name="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  label="Source Species"
                  required
                >
                  {species.map((s) => (
                    <MenuItem key={`source-${s.id}`} value={s.id}>
                      {s.name} ({s.trophicLevel.replace('_', ' ')})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Target Species</InputLabel>
                <Select
                  name="target"
                  value={formData.target}
                  onChange={handleInputChange}
                  label="Target Species"
                  required
                >
                  {species.map((s) => (
                    <MenuItem key={`target-${s.id}`} value={s.id}>
                      {s.name} ({s.trophicLevel.replace('_', ' ')})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Interaction Type</InputLabel>
                <Select
                  name="interactionType"
                  value={formData.interactionType}
                  onChange={handleInputChange}
                  label="Interaction Type"
                >
                  <MenuItem value="trophic" disabled>
                    <em>-- Trophic Interactions --</em>
                  </MenuItem>
                  {INTERACTION_TYPE_LIST.filter(type => type.category === 'trophic').map(type => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                      <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                        {type.description}
                      </Typography>
                    </MenuItem>
                  ))}
                  <MenuItem value="non-trophic" disabled>
                    <em>-- Non-Trophic Interactions --</em>
                  </MenuItem>
                  {INTERACTION_TYPE_LIST.filter(type => type.category === 'non-trophic').map(type => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                      <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                        {type.description}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Seasonality</InputLabel>
                <Select
                  name="seasonality"
                  value={formData.seasonality}
                  onChange={handleInputChange}
                  label="Seasonality"
                >
                  <MenuItem value="all_year">All Year</MenuItem>
                  <MenuItem value="spring">Spring</MenuItem>
                  <MenuItem value="summer">Summer</MenuItem>
                  <MenuItem value="fall">Fall</MenuItem>
                  <MenuItem value="winter">Winter</MenuItem>
                  <MenuItem value="wet_season">Wet Season</MenuItem>
                  <MenuItem value="dry_season">Dry Season</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            {/* Interaction Strength */}
            <Grid item xs={12}>
              <Typography gutterBottom>Interaction Strength</Typography>
              <Slider
                value={formData.strength}
                onChange={(e, value) => setFormData({ ...formData, strength: value })}
                min={0}
                max={1}
                step={0.01}
                valueLabelDisplay="auto"
                marks={[
                  { value: 0, label: 'Weak' },
                  { value: 0.5, label: 'Medium' },
                  { value: 1, label: 'Strong' },
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
                rows={2}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSaveInteraction} 
            variant="contained" 
            color="primary"
            disabled={!formData.source || !formData.target}
          >
            {selectedInteraction ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDialogOpen} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this interaction? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
          <Button onClick={handleDeleteInteraction} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InteractionPanel;