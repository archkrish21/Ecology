import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 * Custom hook for managing the species library
 * This hook provides functionality for fetching, storing, and managing species data
 * that users can import into their simulations.
 */
export const useSpeciesLibrary = () => {
  // Standard species library (predefined species)
  const [speciesList, setSpeciesList] = useState([]);
  
  // User-created species
  const [userSpecies, setUserSpecies] = useState([]);
  
  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Function to fetch predefined species from a data source
  useEffect(() => {
    const fetchSpecies = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would fetch from an API or database
        // For now, we'll use a hardcoded list of example species
        const exampleSpecies = [
          {
            id: '1',
            name: 'Oak Tree',
            scientificName: 'Quercus robur',
            trophicLevel: 'producer',
            taxonomy: 'plant',
            biomass: 500,
            growthRate: 0.05,
            mortalityRate: 0.02,
            metabolicRate: 0.01,
            description: 'A large deciduous tree that provides habitat and food for many species.',
            temperatureTolerance: { min: -5, max: 35 },
            moistureTolerance: { min: 30, max: 80 },
            habitat: ['forest', 'woodland'],
            imageUrl: '/species/oak-tree.jpg'
          },
          {
            id: '2',
            name: 'Grass',
            scientificName: 'Poaceae family',
            trophicLevel: 'producer',
            taxonomy: 'plant',
            biomass: 2,
            growthRate: 0.2,
            mortalityRate: 0.1,
            metabolicRate: 0.05,
            description: 'Fast-growing ground cover that forms the base of many terrestrial food webs.',
            temperatureTolerance: { min: -15, max: 45 },
            moistureTolerance: { min: 20, max: 90 },
            habitat: ['grassland', 'meadow', 'forest'],
            imageUrl: '/species/grass.jpg'
          },
          {
            id: '3',
            name: 'Rabbit',
            scientificName: 'Oryctolagus cuniculus',
            trophicLevel: 'primary_consumer',
            taxonomy: 'mammal',
            biomass: 2,
            growthRate: 0.3,
            mortalityRate: 0.2,
            metabolicRate: 0.15,
            description: 'Small herbivorous mammal that feeds primarily on grasses and other vegetation.',
            temperatureTolerance: { min: -5, max: 30 },
            moistureTolerance: { min: 20, max: 70 },
            habitat: ['grassland', 'woodland', 'forest'],
            imageUrl: '/species/rabbit.jpg'
          },
          {
            id: '4',
            name: 'Fox',
            scientificName: 'Vulpes vulpes',
            trophicLevel: 'secondary_consumer',
            taxonomy: 'mammal',
            biomass: 7,
            growthRate: 0.1,
            mortalityRate: 0.08,
            metabolicRate: 0.2,
            description: 'Medium-sized predator that hunts small mammals, birds, and other prey.',
            temperatureTolerance: { min: -20, max: 35 },
            moistureTolerance: { min: 10, max: 80 },
            habitat: ['forest', 'grassland', 'urban'],
            imageUrl: '/species/fox.jpg'
          },
          {
            id: '5',
            name: 'Hawk',
            scientificName: 'Buteo buteo',
            trophicLevel: 'tertiary_consumer',
            taxonomy: 'bird',
            biomass: 1,
            growthRate: 0.05,
            mortalityRate: 0.04,
            metabolicRate: 0.25,
            description: 'Aerial predator that feeds on small mammals, birds, and reptiles.',
            temperatureTolerance: { min: -10, max: 40 },
            moistureTolerance: { min: 10, max: 70 },
            habitat: ['forest', 'grassland', 'mountain'],
            imageUrl: '/species/hawk.jpg'
          },
          {
            id: '6',
            name: 'Earthworm',
            scientificName: 'Lumbricus terrestris',
            trophicLevel: 'decomposer',
            taxonomy: 'invertebrate',
            biomass: 0.01,
            growthRate: 0.15,
            mortalityRate: 0.1,
            metabolicRate: 0.05,
            description: 'Soil-dwelling invertebrate that breaks down organic matter and improves soil structure.',
            temperatureTolerance: { min: 5, max: 30 },
            moistureTolerance: { min: 40, max: 90 },
            habitat: ['forest', 'grassland', 'garden'],
            imageUrl: '/species/earthworm.jpg'
          },
          {
            id: '7',
            name: 'Deer',
            scientificName: 'Cervus elaphus',
            trophicLevel: 'primary_consumer',
            taxonomy: 'mammal',
            biomass: 150,
            growthRate: 0.08,
            mortalityRate: 0.06,
            metabolicRate: 0.12,
            description: 'Large herbivorous mammal that browses on leaves, twigs, and grasses.',
            temperatureTolerance: { min: -25, max: 35 },
            moistureTolerance: { min: 20, max: 80 },
            habitat: ['forest', 'woodland', 'grassland'],
            imageUrl: '/species/deer.jpg'
          },
          {
            id: '8',
            name: 'Wolf',
            scientificName: 'Canis lupus',
            trophicLevel: 'tertiary_consumer',
            taxonomy: 'mammal',
            biomass: 40,
            growthRate: 0.05,
            mortalityRate: 0.04,
            metabolicRate: 0.18,
            description: 'Pack-hunting predator that preys on large herbivores like deer and elk.',
            temperatureTolerance: { min: -40, max: 35 },
            moistureTolerance: { min: 10, max: 70 },
            habitat: ['forest', 'tundra', 'mountain'],
            imageUrl: '/species/wolf.jpg'
          },
          {
            id: '9',
            name: 'Mushroom',
            scientificName: 'Agaricus bisporus',
            trophicLevel: 'decomposer',
            taxonomy: 'fungi',
            biomass: 0.05,
            growthRate: 0.3,
            mortalityRate: 0.25,
            metabolicRate: 0.1,
            description: 'Fungal organism that breaks down dead organic matter and recycles nutrients.',
            temperatureTolerance: { min: 5, max: 30 },
            moistureTolerance: { min: 60, max: 95 },
            habitat: ['forest', 'woodland', 'grassland'],
            imageUrl: '/species/mushroom.jpg'
          },
          {
            id: '10',
            name: 'Bee',
            scientificName: 'Apis mellifera',
            trophicLevel: 'primary_consumer',
            taxonomy: 'invertebrate',
            biomass: 0.0001,
            growthRate: 0.4,
            mortalityRate: 0.3,
            metabolicRate: 0.2,
            description: 'Pollinating insect that feeds on nectar and plays a crucial role in plant reproduction.',
            temperatureTolerance: { min: 10, max: 40 },
            moistureTolerance: { min: 30, max: 70 },
            habitat: ['forest', 'grassland', 'garden'],
            imageUrl: '/species/bee.jpg'
          },
          {
            id: '11',
            name: 'Algae',
            scientificName: 'Chlorophyta',
            trophicLevel: 'producer',
            taxonomy: 'plant',
            biomass: 0.001,
            growthRate: 0.5,
            mortalityRate: 0.3,
            metabolicRate: 0.1,
            description: 'Photosynthetic aquatic organisms that form the base of many aquatic food webs.',
            temperatureTolerance: { min: 0, max: 35 },
            moistureTolerance: { min: 100, max: 100 },
            habitat: ['lake', 'river', 'ocean'],
            imageUrl: '/species/algae.jpg'
          },
          {
            id: '12',
            name: 'Fish',
            scientificName: 'Micropterus salmoides',
            trophicLevel: 'secondary_consumer',
            taxonomy: 'fish',
            biomass: 1,
            growthRate: 0.15,
            mortalityRate: 0.1,
            metabolicRate: 0.15,
            description: 'Aquatic vertebrate that feeds on smaller fish, insects, and other aquatic organisms.',
            temperatureTolerance: { min: 5, max: 30 },
            moistureTolerance: { min: 100, max: 100 },
            habitat: ['lake', 'river', 'stream'],
            imageUrl: '/species/fish.jpg'
          }
        ];
        
        setSpeciesList(exampleSpecies);
        
        // Load user species from localStorage
        const savedUserSpecies = localStorage.getItem('userSpecies');
        if (savedUserSpecies) {
          setUserSpecies(JSON.parse(savedUserSpecies));
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching species data:', err);
        setError('Failed to load species data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchSpecies();
  }, []);
  
  // Add a new species to the user's collection
  const addSpecies = (speciesData) => {
    const newSpecies = {
      ...speciesData,
      id: speciesData.id || uuidv4(),
      createdAt: new Date().toISOString()
    };
    
    setUserSpecies(prevSpecies => {
      const updatedSpecies = [...prevSpecies, newSpecies];
      // Save to localStorage
      localStorage.setItem('userSpecies', JSON.stringify(updatedSpecies));
      return updatedSpecies;
    });
  };
  
  // Update an existing species in the user's collection
  const updateSpecies = (updatedSpecies) => {
    setUserSpecies(prevSpecies => {
      const updatedList = prevSpecies.map(species => 
        species.id === updatedSpecies.id ? { ...species, ...updatedSpecies } : species
      );
      // Save to localStorage
      localStorage.setItem('userSpecies', JSON.stringify(updatedList));
      return updatedList;
    });
  };
  
  // Delete a species from the user's collection
  const deleteSpecies = (speciesId) => {
    setUserSpecies(prevSpecies => {
      const updatedList = prevSpecies.filter(species => species.id !== speciesId);
      // Save to localStorage
      localStorage.setItem('userSpecies', JSON.stringify(updatedList));
      return updatedList;
    });
  };
  
  // Import a species to the simulation
  const importToSimulation = (species) => {
    // This function would typically communicate with the simulation engine
    // to add the selected species to the current simulation
    console.log('Importing species to simulation:', species);
    
    // For now, we'll just return the species data
    // In a real implementation, this might dispatch an action or call a callback
    return species;
  };
  
  return {
    speciesList,
    userSpecies,
    loading,
    error,
    addSpecies,
    updateSpecies,
    deleteSpecies,
    importToSimulation
  };
};