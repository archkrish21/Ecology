import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Import species data service (we'll create this later)
import { useSpeciesLibrary } from '../hooks/useSpeciesLibrary';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`species-tabpanel-${index}`}
      aria-labelledby={`species-tab-${index}`}
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
    id: `species-tab-${index}`,
    'aria-controls': `species-tabpanel-${index}`,
  };
}

function SpeciesLibraryPage() {
  // State for the active tab
  const [tabValue, setTabValue] = useState(0);
  
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [trophicFilter, setTrophicFilter] = useState('all');
  const [taxonomyFilter, setTaxonomyFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  
  // State for species detail dialog
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  
  // State for add/edit species dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingSpecies, setEditingSpecies] = useState(null);
  
  // Get species data from the hook
  const {
    speciesList,
    userSpecies,
    loading,
    error,
    addSpecies,
    updateSpecies,
    deleteSpecies,
    importToSimulation
  } = useSpeciesLibrary();
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setCurrentPage(1); // Reset to first page when changing tabs
  };
  
  // Filter species based on search term and filters
  const getFilteredSpecies = () => {
    const sourceList = tabValue === 0 ? speciesList : userSpecies;
    
    return sourceList.filter(species => {
      const matchesSearch = searchTerm === '' || 
        species.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        species.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTrophic = trophicFilter === 'all' || species.trophicLevel === trophicFilter;
      const matchesTaxonomy = taxonomyFilter === 'all' || species.taxonomy.includes(taxonomyFilter);
      
      return matchesSearch && matchesTrophic && matchesTaxonomy;
    });
  };
  
  // Get current page items
  const getCurrentItems = () => {
    const filteredSpecies = getFilteredSpecies();
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredSpecies.slice(indexOfFirstItem, indexOfLastItem);
  };
  
  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  
  // Handle opening species detail dialog
  const handleOpenDetailDialog = (species) => {
    setSelectedSpecies(species);
    setDetailDialogOpen(true);
  };
  
  // Handle closing species detail dialog
  const handleCloseDetailDialog = () => {
    setDetailDialogOpen(false);
  };
  
  // Handle opening add/edit species dialog
  const handleOpenEditDialog = (species = null) => {
    setEditingSpecies(species);
    setEditDialogOpen(true);
  };
  
  // Handle closing add/edit species dialog
  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditingSpecies(null);
  };
  
  // Handle saving species from edit dialog
  const handleSaveSpecies = (speciesData) => {
    if (editingSpecies) {
      updateSpecies({
        ...editingSpecies,
        ...speciesData
      });
    } else {
      addSpecies(speciesData);
    }
    handleCloseEditDialog();
  };
  
  // Handle deleting a species
  const handleDeleteSpecies = (speciesId) => {
    deleteSpecies(speciesId);
    handleCloseDetailDialog();
  };
  
  // Handle importing a species to the simulation
  const handleImportToSimulation = (species) => {
    importToSimulation(species);
    // Could show a success message or redirect to simulation page
  };
  
  // Get the count of filtered species for pagination
  const filteredSpeciesCount = getFilteredSpecies().length;
  const pageCount = Math.ceil(filteredSpeciesCount / itemsPerPage);
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Species Library
      </Typography>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Standard Species" {...a11yProps(0)} />
          <Tab label="My Species" {...a11yProps(1)} />
        </Tabs>
      </Paper>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search Species"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="trophic-level-filter-label">Trophic Level</InputLabel>
              <Select
                labelId="trophic-level-filter-label"
                value={trophicFilter}
                onChange={(e) => setTrophicFilter(e.target.value)}
                label="Trophic Level"
              >
                <MenuItem value="all">All Levels</MenuItem>
                <MenuItem value="producer">Producer</MenuItem>
                <MenuItem value="primary_consumer">Primary Consumer</MenuItem>
                <MenuItem value="secondary_consumer">Secondary Consumer</MenuItem>
                <MenuItem value="tertiary_consumer">Tertiary Consumer</MenuItem>
                <MenuItem value="decomposer">Decomposer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="taxonomy-filter-label">Taxonomy</InputLabel>
              <Select
                labelId="taxonomy-filter-label"
                value={taxonomyFilter}
                onChange={(e) => setTaxonomyFilter(e.target.value)}
                label="Taxonomy"
              >
                <MenuItem value="all">All Taxa</MenuItem>
                <MenuItem value="mammal">Mammals</MenuItem>
                <MenuItem value="bird">Birds</MenuItem>
                <MenuItem value="reptile">Reptiles</MenuItem>
                <MenuItem value="amphibian">Amphibians</MenuItem>
                <MenuItem value="fish">Fish</MenuItem>
                <MenuItem value="invertebrate">Invertebrates</MenuItem>
                <MenuItem value="plant">Plants</MenuItem>
                <MenuItem value="fungi">Fungi</MenuItem>
                <MenuItem value="bacteria">Bacteria</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            {tabValue === 1 && (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => handleOpenEditDialog()}
              >
                Add Species
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
      
      <TabPanel value={tabValue} index={0}>
        {loading ? (
          <Typography>Loading species data...</Typography>
        ) : error ? (
          <Typography color="error">Error loading species data: {error}</Typography>
        ) : (
          <>
            <Grid container spacing={3}>
              {getCurrentItems().map((species) => (
                <Grid item key={species.id} xs={12} sm={6} md={4} lg={3}>
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
                    <CardMedia
                      component="img"
                      height="140"
                      image={species.imageUrl || '/placeholder-species.jpg'}
                      alt={species.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="div">
                        {species.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <em>{species.scientificName}</em>
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Chip 
                          label={species.trophicLevel.replace('_', ' ')} 
                          size="small" 
                          color="primary" 
                          sx={{ mr: 1, mb: 1 }} 
                        />
                        <Chip 
                          label={species.taxonomy} 
                          size="small" 
                          sx={{ mb: 1 }} 
                        />
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => handleOpenDetailDialog(species)}>
                        Details
                      </Button>
                      <Button size="small" onClick={() => handleImportToSimulation(species)}>
                        Add to Simulation
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            {pageCount > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination 
                  count={pageCount} 
                  page={currentPage} 
                  onChange={handlePageChange} 
                  color="primary" 
                />
              </Box>
            )}
          </>
        )}
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        {userSpecies.length === 0 ? (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              You haven't created any custom species yet
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenEditDialog()}
              sx={{ mt: 2 }}
            >
              Create Your First Species
            </Button>
          </Paper>
        ) : (
          <>
            <Grid container spacing={3}>
              {getCurrentItems().map((species) => (
                <Grid item key={species.id} xs={12} sm={6} md={4} lg={3}>
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
                    <CardMedia
                      component="img"
                      height="140"
                      image={species.imageUrl || '/placeholder-species.jpg'}
                      alt={species.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="div">
                        {species.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <em>{species.scientificName}</em>
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Chip 
                          label={species.trophicLevel.replace('_', ' ')} 
                          size="small" 
                          color="primary" 
                          sx={{ mr: 1, mb: 1 }} 
                        />
                        <Chip 
                          label={species.taxonomy} 
                          size="small" 
                          sx={{ mb: 1 }} 
                        />
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => handleOpenDetailDialog(species)}>
                        Details
                      </Button>
                      <Button size="small" onClick={() => handleOpenEditDialog(species)}>
                        Edit
                      </Button>
                      <Button size="small" onClick={() => handleImportToSimulation(species)}>
                        Use
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            {pageCount > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination 
                  count={pageCount} 
                  page={currentPage} 
                  onChange={handlePageChange} 
                  color="primary" 
                />
              </Box>
            )}
          </>
        )}
      </TabPanel>
      
      {/* Species Detail Dialog */}
      <Dialog
        open={detailDialogOpen}
        onClose={handleCloseDetailDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedSpecies && (
          <>
            <DialogTitle>{selectedSpecies.name}</DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <img 
                    src={selectedSpecies.imageUrl || '/placeholder-species.jpg'} 
                    alt={selectedSpecies.name}
                    style={{ width: '100%', borderRadius: '4px' }}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Scientific Name:</strong> <em>{selectedSpecies.scientificName}</em>
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Chip 
                      label={selectedSpecies.trophicLevel.replace('_', ' ')} 
                      size="small" 
                      color="primary" 
                      sx={{ mr: 1 }} 
                    />
                    <Chip 
                      label={selectedSpecies.taxonomy} 
                      size="small" 
                    />
                  </Box>
                  
                  <Typography variant="body1" paragraph>
                    {selectedSpecies.description}
                  </Typography>
                  
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Ecological Properties:</strong>
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        <strong>Biomass:</strong> {selectedSpecies.biomass} kg/m²
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        <strong>Growth Rate:</strong> {selectedSpecies.growthRate} per time unit
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        <strong>Mortality Rate:</strong> {selectedSpecies.mortalityRate} per time unit
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        <strong>Metabolic Rate:</strong> {selectedSpecies.metabolicRate} energy/time
                      </Typography>
                    </Grid>
                  </Grid>
                  
                  <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>
                    <strong>Environmental Tolerances:</strong>
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        <strong>Temperature:</strong> {selectedSpecies.temperatureTolerance.min}°C to {selectedSpecies.temperatureTolerance.max}°C
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        <strong>Moisture:</strong> {selectedSpecies.moistureTolerance.min}% to {selectedSpecies.moistureTolerance.max}%
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        <strong>Habitat:</strong> {selectedSpecies.habitat.join(', ')}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              {tabValue === 1 && (
                <Button onClick={() => handleDeleteSpecies(selectedSpecies.id)} color="error">
                  Delete
                </Button>
              )}
              <Button onClick={() => handleImportToSimulation(selectedSpecies)} color="primary">
                Add to Simulation
              </Button>
              <Button onClick={handleCloseDetailDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      
      {/* Add/Edit Species Dialog - This would be a complex form that we'll implement later */}
      <Dialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingSpecies ? 'Edit Species' : 'Add New Species'}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText sx={{ mb: 2 }}>
            {editingSpecies 
              ? 'Edit the properties of this species.'
              : 'Create a new species by filling out the form below.'}
          </DialogContentText>
          
          {/* This would be replaced with a proper form component */}
          <Typography variant="body2" color="text.secondary">
            Species form would go here with fields for name, scientific name, trophic level,
            taxonomy, biomass, growth rate, mortality rate, etc.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={() => handleSaveSpecies({})} color="primary">
            {editingSpecies ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default SpeciesLibraryPage;