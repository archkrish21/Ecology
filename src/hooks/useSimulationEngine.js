import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { calculateNetInteractionEffect } from '../models/EcologicalInteractions';

/**
 * Custom hook for managing the ecological food web simulation engine
 * This hook handles the state and logic for the simulation, including
 * species interactions, environmental factors, and time progression.
 */
export const useSimulationEngine = () => {
  // Food web state (nodes = species, links = interactions)
  const [foodWeb, setFoodWeb] = useState({
    nodes: [],
    links: []
  });
  
  // Simulation state
  const [simulationStatus, setSimulationStatus] = useState('idle'); // idle, running, paused
  const [simulationTime, setSimulationTime] = useState(0);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [simulationInterval, setSimulationInterval] = useState(null);
  
  // Simulation results
  const [simulationResults, setSimulationResults] = useState({
    populationData: [],
    networkMetrics: [],
    environmentalData: []
  });
  
  // Environmental factors
  const [environmentalFactors, setEnvironmentalFactors] = useState({
    temperature: {
      current: 20,
      variation: { type: 'seasonal', amplitude: 10 }
    },
    precipitation: {
      current: 5,
      variation: { type: 'seasonal', amplitude: 15 }
    },
    light: {
      current: 80,
      variation: { type: 'seasonal', amplitude: 20 }
    },
    nutrients: {
      current: 70,
      variation: { type: 'none', amplitude: 0 }
    }
  });
  
  // Add a species to the food web
  const addSpecies = useCallback((species) => {
    setFoodWeb(prev => ({
      ...prev,
      nodes: [...prev.nodes, {
        ...species,
        id: species.id || uuidv4(),
        population: species.biomass * 10, // Initial population based on biomass
        history: [] // Population history for tracking
      }]
    }));
  }, []);
  
  // Remove a species from the food web
  const removeSpecies = useCallback((speciesId) => {
    setFoodWeb(prev => ({
      nodes: prev.nodes.filter(node => node.id !== speciesId),
      links: prev.links.filter(link => link.source !== speciesId && link.target !== speciesId)
    }));
  }, []);
  
  // Update a species in the food web
  const updateSpecies = useCallback((updatedSpecies) => {
    setFoodWeb(prev => ({
      ...prev,
      nodes: prev.nodes.map(node => 
        node.id === updatedSpecies.id ? { ...node, ...updatedSpecies } : node
      )
    }));
  }, []);
  
  // Add an interaction to the food web
  const addInteraction = useCallback((interaction) => {
    setFoodWeb(prev => ({
      ...prev,
      links: [...prev.links, {
        ...interaction,
        id: interaction.id || uuidv4()
      }]
    }));
  }, []);
  
  // Remove an interaction from the food web
  const removeInteraction = useCallback((interactionId) => {
    setFoodWeb(prev => ({
      ...prev,
      links: prev.links.filter(link => link.id !== interactionId)
    }));
  }, []);
  
  // Update an interaction in the food web
  const updateInteraction = useCallback((updatedInteraction) => {
    setFoodWeb(prev => ({
      ...prev,
      links: prev.links.map(link => 
        link.id === updatedInteraction.id ? { ...link, ...updatedInteraction } : link
      )
    }));
  }, []);
  
  // Update an environmental factor
  const updateEnvironmentalFactor = useCallback((factorName, factorData) => {
    setEnvironmentalFactors(prev => ({
      ...prev,
      [factorName]: factorData
    }));
  }, []);
  
  // Start the simulation
  const startSimulation = useCallback(() => {
    if (simulationStatus === 'running') return;
    
    setSimulationStatus('running');
    
    // Clear any existing interval
    if (simulationInterval) {
      clearInterval(simulationInterval);
    }
    
    // Set up the simulation interval
    const interval = setInterval(() => {
      // Update simulation time
      setSimulationTime(prevTime => {
        const newTime = prevTime + 0.1 * simulationSpeed;
        return newTime;
      });
      
      // Update environmental factors based on time and variation
      setEnvironmentalFactors(prevFactors => {
        const updatedFactors = { ...prevFactors };
        
        // Update each factor based on its variation type
        Object.keys(updatedFactors).forEach(factorName => {
          const factor = updatedFactors[factorName];
          const { variation } = factor;
          
          if (variation.type === 'seasonal') {
            // Seasonal variation (sinusoidal)
            const newValue = factor.current + 
              variation.amplitude * Math.sin(simulationTime / 10) * 0.1 * simulationSpeed;
            
            updatedFactors[factorName] = {
              ...factor,
              current: Math.max(0, newValue) // Ensure non-negative values
            };
          } else if (variation.type === 'random') {
            // Random fluctuations
            const randomChange = (Math.random() - 0.5) * variation.amplitude * 0.1 * simulationSpeed;
            const newValue = factor.current + randomChange;
            
            updatedFactors[factorName] = {
              ...factor,
              current: Math.max(0, newValue) // Ensure non-negative values
            };
          } else if (variation.type === 'trend') {
            // Long-term trend (linear)
            const trendChange = variation.amplitude * 0.01 * simulationSpeed;
            const newValue = factor.current + trendChange;
            
            updatedFactors[factorName] = {
              ...factor,
              current: Math.max(0, newValue) // Ensure non-negative values
            };
          }
          // For 'none' variation type, no changes are made
        });
        
        return updatedFactors;
      });
      
      // Update species populations based on interactions and environmental factors
      setFoodWeb(prevWeb => {
        const updatedNodes = [...prevWeb.nodes];
        
        // Calculate population changes for each species
        updatedNodes.forEach(species => {
          // Base growth rate (intrinsic growth)
          let growthRate = species.growthRate;
          
          // Adjust growth rate based on environmental factors
          // This is a simplified model - in a real implementation, this would be more complex
          // and based on species-specific environmental tolerances
          const tempEffect = calculateEnvironmentalEffect(
            environmentalFactors.temperature.current,
            species.temperatureTolerance?.min || 0,
            species.temperatureTolerance?.max || 40
          );
          
          const moistureEffect = calculateEnvironmentalEffect(
            environmentalFactors.precipitation.current,
            species.moistureTolerance?.min || 0,
            species.moistureTolerance?.max || 100
          );
          
          // Apply environmental effects to growth rate
          growthRate *= tempEffect * moistureEffect;
          
          // Apply mortality rate
          let mortalityRate = species.mortalityRate;
          
          // Calculate effects from interactions (predation, competition, etc.)
          const interactionEffects = calculateInteractionEffects(species, prevWeb);
          
          // Calculate net population change
          const netGrowth = (growthRate - mortalityRate + interactionEffects) * species.population;
          
          // Update population
          species.population = Math.max(0, species.population + netGrowth * 0.1 * simulationSpeed);
          
          // Record history for plotting
          species.history = [...(species.history || []), {
            time: simulationTime,
            population: species.population
          }];
        });
        
        // Update simulation results
        updateSimulationResults(updatedNodes, prevWeb.links, environmentalFactors);
        
        return {
          nodes: updatedNodes,
          links: prevWeb.links
        };
      });
    }, 100); // Update every 100ms
    
    setSimulationInterval(interval);
  }, [simulationStatus, simulationInterval, simulationSpeed, environmentalFactors]);
  
  // Pause the simulation
  const pauseSimulation = useCallback(() => {
    if (simulationStatus !== 'running') return;
    
    setSimulationStatus('paused');
    
    if (simulationInterval) {
      clearInterval(simulationInterval);
      setSimulationInterval(null);
    }
  }, [simulationStatus, simulationInterval]);
  
  // Reset the simulation
  const resetSimulation = useCallback(() => {
    // Stop the simulation if it's running
    if (simulationStatus === 'running') {
      pauseSimulation();
    }
    
    setSimulationStatus('idle');
    setSimulationTime(0);
    
    // Reset species populations and history
    setFoodWeb(prev => ({
      nodes: prev.nodes.map(node => ({
        ...node,
        population: node.biomass * 10, // Reset to initial population
        history: [] // Clear history
      })),
      links: prev.links
    }));
    
    // Reset environmental factors
    setEnvironmentalFactors({
      temperature: {
        current: 20,
        variation: { type: 'seasonal', amplitude: 10 }
      },
      precipitation: {
        current: 5,
        variation: { type: 'seasonal', amplitude: 15 }
      },
      light: {
        current: 80,
        variation: { type: 'seasonal', amplitude: 20 }
      },
      nutrients: {
        current: 70,
        variation: { type: 'none', amplitude: 0 }
      }
    });
    
    // Reset simulation results
    setSimulationResults({
      populationData: [],
      networkMetrics: [],
      environmentalData: []
    });
  }, [simulationStatus, pauseSimulation]);
  
  // Helper function to calculate environmental effects on species
  const calculateEnvironmentalEffect = (currentValue, minTolerance, maxTolerance) => {
    // If the current value is within tolerance range, effect is optimal (1.0)
    // Otherwise, effect decreases as the value moves away from the tolerance range
    if (currentValue >= minTolerance && currentValue <= maxTolerance) {
      return 1.0;
    } else if (currentValue < minTolerance) {
      // Below minimum tolerance
      const distanceFromRange = minTolerance - currentValue;
      return Math.max(0, 1 - distanceFromRange / minTolerance);
    } else {
      // Above maximum tolerance
      const distanceFromRange = currentValue - maxTolerance;
      return Math.max(0, 1 - distanceFromRange / maxTolerance);
    }
  };
  
  // Helper function to calculate effects from interactions
  const calculateInteractionEffects = (species, foodWeb) => {
    // Use the imported calculateNetInteractionEffect function from our ecological interactions model
    // This is a more comprehensive model that handles both trophic and non-trophic interactions
    // with scientifically accurate mathematical representations
    return calculateNetInteractionEffect(species, foodWeb);
  };
  
  // Update simulation results based on current state
  const updateSimulationResults = (nodes, links, environmentalFactors) => {
    // Update population data
    const populationData = nodes.map(node => ({
      id: node.id,
      name: node.name,
      population: node.population,
      time: simulationTime
    }));
    
    // Calculate network metrics
    const networkMetrics = {
      connectance: calculateConnectance(nodes.length, links.length),
      avgPathLength: calculateAveragePathLength(nodes, links),
      clustering: calculateClusteringCoefficient(nodes, links),
      modularity: Math.random(), // Placeholder for actual calculation
      robustness: Math.random(), // Placeholder for actual calculation
      nestedness: Math.random(), // Placeholder for actual calculation
      time: simulationTime
    };
    
    // Record environmental data
    const environmentalData = {
      temperature: environmentalFactors.temperature.current,
      precipitation: environmentalFactors.precipitation.current,
      light: environmentalFactors.light.current,
      nutrients: environmentalFactors.nutrients.current,
      time: simulationTime
    };
    
    setSimulationResults(prev => ({
      populationData: [...prev.populationData, populationData],
      networkMetrics: [...prev.networkMetrics, networkMetrics],
      environmentalData: [...prev.environmentalData, environmentalData]
    }));
  };
  
  // Calculate connectance (proportion of realized connections)
  const calculateConnectance = (numNodes, numLinks) => {
    if (numNodes <= 1) return 0;
    const maxPossibleLinks = numNodes * (numNodes - 1);
    return maxPossibleLinks > 0 ? numLinks / maxPossibleLinks : 0;
  };
  
  // Placeholder for average path length calculation
  const calculateAveragePathLength = (nodes, links) => {
    // In a real implementation, this would use a graph algorithm
    // to calculate the average shortest path length between all pairs of nodes
    return Math.random() * 3 + 1; // Placeholder value
  };
  
  // Placeholder for clustering coefficient calculation
  const calculateClusteringCoefficient = (nodes, links) => {
    // In a real implementation, this would calculate the average
    // clustering coefficient across all nodes
    return Math.random(); // Placeholder value
  };
  
  // Save the current simulation state
  const saveSimulation = (name) => {
    const simulationData = {
      name,
      date: new Date().toISOString(),
      foodWeb,
      environmentalFactors,
      simulationTime
    };
    
    // In a real implementation, this would save to a database or local storage
    console.log('Saving simulation:', simulationData);
    
    // For now, we'll just save to localStorage as an example
    try {
      const savedSimulations = JSON.parse(localStorage.getItem('savedSimulations') || '[]');
      savedSimulations.push(simulationData);
      localStorage.setItem('savedSimulations', JSON.stringify(savedSimulations));
      alert(`Simulation "${name}" saved successfully!`);
    } catch (error) {
      console.error('Error saving simulation:', error);
      alert('Failed to save simulation. See console for details.');
    }
  };
  
  // Load a saved simulation
  const loadSimulation = (simulationId) => {
    // In a real implementation, this would load from a database or local storage
    console.log('Loading simulation with ID:', simulationId);
    
    // For now, we'll just load from localStorage as an example
    try {
      const savedSimulations = JSON.parse(localStorage.getItem('savedSimulations') || '[]');
      const simulation = savedSimulations.find(sim => sim.id === simulationId);
      
      if (simulation) {
        setFoodWeb(simulation.foodWeb);
        setEnvironmentalFactors(simulation.environmentalFactors);
        setSimulationTime(simulation.simulationTime);
        alert(`Simulation "${simulation.name}" loaded successfully!`);
      } else {
        alert('Simulation not found.');
      }
    } catch (error) {
      console.error('Error loading simulation:', error);
      alert('Failed to load simulation. See console for details.');
    }
  };
  
  // Export simulation data
  const exportData = (dataType = 'all') => {
    let dataToExport;
    
    switch (dataType) {
      case 'population':
        dataToExport = simulationResults.populationData;
        break;
      case 'network':
        dataToExport = simulationResults.networkMetrics;
        break;
      case 'environmental':
        dataToExport = simulationResults.environmentalData;
        break;
      default:
        dataToExport = simulationResults;
    }
    
    // Convert to JSON
    const jsonData = JSON.stringify(dataToExport, null, 2);
    
    // Create a blob and download link
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `food-web-simulation-${dataType}-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Import simulation data
  const importData = () => {
    // In a real implementation, this would open a file dialog
    // and parse the imported JSON data
    alert('Import functionality would be implemented here.');
  };
  
  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (simulationInterval) {
        clearInterval(simulationInterval);
      }
    };
  }, [simulationInterval]);
  
  return {
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
  };
};