/**
 * EcologicalInteractions.js
 * 
 * This module provides models and utilities for handling ecological interactions
 * in the food web simulation. It supports both trophic and non-trophic interactions
 * with scientifically accurate mathematical models.
 */

/**
 * Interaction types categorized by their ecological classification
 */
export const INTERACTION_TYPES = {
  // Trophic interactions (involve energy transfer)
  TROPHIC: {
    PREDATION: 'predation',           // Predator consumes prey
    HERBIVORY: 'herbivory',           // Herbivore consumes plant
    PARASITISM: 'parasitism',         // Parasite feeds on host
    PARASITOIDISM: 'parasitoidism',   // Parasitoid eventually kills host
    DETRITIVORY: 'detritivory'        // Organism feeds on dead matter
  },
  
  // Non-trophic interactions (don't directly involve energy transfer)
  NON_TROPHIC: {
    // Competition interactions
    COMPETITION: 'competition',        // Species compete for resources
    INTERFERENCE: 'interference',      // Direct inhibition between species
    
    // Mutualistic interactions
    MUTUALISM: 'mutualism',           // Both species benefit
    POLLINATION: 'pollination',       // Animal pollinates plant
    SEED_DISPERSAL: 'seed_dispersal', // Animal disperses plant seeds
    PROTECTION: 'protection',         // One species protects another
    
    // Commensalistic interactions
    COMMENSALISM: 'commensalism',     // One benefits, other unaffected
    INQUILINISM: 'inquilinism',       // One species uses another as habitat
    PHORESY: 'phoresy',               // One species uses another for transport
    
    // Antagonistic interactions
    AMENSALISM: 'amensalism',         // One species harmed, other unaffected
    ALLELOPATHY: 'allelopathy',       // Chemical inhibition
    
    // Facilitative interactions
    FACILITATION: 'facilitation',     // One species makes environment more suitable
    ECOSYSTEM_ENGINEERING: 'ecosystem_engineering' // Species modifies habitat
  }
};

/**
 * Flattened interaction types for UI display and selection
 */
export const INTERACTION_TYPE_LIST = [
  // Trophic interactions
  { value: INTERACTION_TYPES.TROPHIC.PREDATION, label: 'Predation', category: 'trophic', description: 'Predator consumes prey' },
  { value: INTERACTION_TYPES.TROPHIC.HERBIVORY, label: 'Herbivory', category: 'trophic', description: 'Herbivore consumes plant' },
  { value: INTERACTION_TYPES.TROPHIC.PARASITISM, label: 'Parasitism', category: 'trophic', description: 'Parasite feeds on host' },
  { value: INTERACTION_TYPES.TROPHIC.PARASITOIDISM, label: 'Parasitoidism', category: 'trophic', description: 'Parasitoid eventually kills host' },
  { value: INTERACTION_TYPES.TROPHIC.DETRITIVORY, label: 'Detritivory', category: 'trophic', description: 'Organism feeds on dead matter' },
  
  // Non-trophic interactions
  { value: INTERACTION_TYPES.NON_TROPHIC.COMPETITION, label: 'Competition', category: 'non-trophic', description: 'Species compete for resources' },
  { value: INTERACTION_TYPES.NON_TROPHIC.INTERFERENCE, label: 'Interference', category: 'non-trophic', description: 'Direct inhibition between species' },
  { value: INTERACTION_TYPES.NON_TROPHIC.MUTUALISM, label: 'Mutualism', category: 'non-trophic', description: 'Both species benefit' },
  { value: INTERACTION_TYPES.NON_TROPHIC.POLLINATION, label: 'Pollination', category: 'non-trophic', description: 'Animal pollinates plant' },
  { value: INTERACTION_TYPES.NON_TROPHIC.SEED_DISPERSAL, label: 'Seed Dispersal', category: 'non-trophic', description: 'Animal disperses plant seeds' },
  { value: INTERACTION_TYPES.NON_TROPHIC.PROTECTION, label: 'Protection', category: 'non-trophic', description: 'One species protects another' },
  { value: INTERACTION_TYPES.NON_TROPHIC.COMMENSALISM, label: 'Commensalism', category: 'non-trophic', description: 'One benefits, other unaffected' },
  { value: INTERACTION_TYPES.NON_TROPHIC.INQUILINISM, label: 'Inquilinism', category: 'non-trophic', description: 'One species uses another as habitat' },
  { value: INTERACTION_TYPES.NON_TROPHIC.PHORESY, label: 'Phoresy', category: 'non-trophic', description: 'One species uses another for transport' },
  { value: INTERACTION_TYPES.NON_TROPHIC.AMENSALISM, label: 'Amensalism', category: 'non-trophic', description: 'One species harmed, other unaffected' },
  { value: INTERACTION_TYPES.NON_TROPHIC.ALLELOPATHY, label: 'Allelopathy', category: 'non-trophic', description: 'Chemical inhibition' },
  { value: INTERACTION_TYPES.NON_TROPHIC.FACILITATION, label: 'Facilitation', category: 'non-trophic', description: 'One species makes environment more suitable' },
  { value: INTERACTION_TYPES.NON_TROPHIC.ECOSYSTEM_ENGINEERING, label: 'Ecosystem Engineering', category: 'non-trophic', description: 'Species modifies habitat' }
];

/**
 * Interaction colors for visualization
 */
export const INTERACTION_COLORS = {
  // Trophic interactions
  [INTERACTION_TYPES.TROPHIC.PREDATION]: '#e74c3c',       // red
  [INTERACTION_TYPES.TROPHIC.HERBIVORY]: '#f39c12',       // orange
  [INTERACTION_TYPES.TROPHIC.PARASITISM]: '#9b59b6',      // purple
  [INTERACTION_TYPES.TROPHIC.PARASITOIDISM]: '#8e44ad',   // dark purple
  [INTERACTION_TYPES.TROPHIC.DETRITIVORY]: '#3498db',     // blue
  
  // Non-trophic interactions
  [INTERACTION_TYPES.NON_TROPHIC.COMPETITION]: '#e67e22',    // dark orange
  [INTERACTION_TYPES.NON_TROPHIC.INTERFERENCE]: '#d35400',  // darker orange
  [INTERACTION_TYPES.NON_TROPHIC.MUTUALISM]: '#2ecc71',     // green
  [INTERACTION_TYPES.NON_TROPHIC.POLLINATION]: '#27ae60',   // dark green
  [INTERACTION_TYPES.NON_TROPHIC.SEED_DISPERSAL]: '#1abc9c', // turquoise
  [INTERACTION_TYPES.NON_TROPHIC.PROTECTION]: '#16a085',    // dark turquoise
  [INTERACTION_TYPES.NON_TROPHIC.COMMENSALISM]: '#1abc9c',  // turquoise
  [INTERACTION_TYPES.NON_TROPHIC.INQUILINISM]: '#3498db',   // blue
  [INTERACTION_TYPES.NON_TROPHIC.PHORESY]: '#2980b9',       // dark blue
  [INTERACTION_TYPES.NON_TROPHIC.AMENSALISM]: '#c0392b',    // dark red
  [INTERACTION_TYPES.NON_TROPHIC.ALLELOPATHY]: '#922b21',   // darker red
  [INTERACTION_TYPES.NON_TROPHIC.FACILITATION]: '#16a085',  // dark turquoise
  [INTERACTION_TYPES.NON_TROPHIC.ECOSYSTEM_ENGINEERING]: '#1abc9c' // turquoise
};

/**
 * Determines if an interaction is directional (has a clear source and target)
 * @param {string} interactionType - The type of interaction
 * @returns {boolean} - Whether the interaction is directional
 */
export const isDirectionalInteraction = (interactionType) => {
  const directionalTypes = [
    INTERACTION_TYPES.TROPHIC.PREDATION,
    INTERACTION_TYPES.TROPHIC.HERBIVORY,
    INTERACTION_TYPES.TROPHIC.PARASITISM,
    INTERACTION_TYPES.TROPHIC.PARASITOIDISM,
    INTERACTION_TYPES.TROPHIC.DETRITIVORY,
    INTERACTION_TYPES.NON_TROPHIC.POLLINATION,
    INTERACTION_TYPES.NON_TROPHIC.SEED_DISPERSAL,
    INTERACTION_TYPES.NON_TROPHIC.PROTECTION,
    INTERACTION_TYPES.NON_TROPHIC.COMMENSALISM,
    INTERACTION_TYPES.NON_TROPHIC.INQUILINISM,
    INTERACTION_TYPES.NON_TROPHIC.PHORESY,
    INTERACTION_TYPES.NON_TROPHIC.AMENSALISM,
    INTERACTION_TYPES.NON_TROPHIC.ALLELOPATHY,
    INTERACTION_TYPES.NON_TROPHIC.FACILITATION,
    INTERACTION_TYPES.NON_TROPHIC.ECOSYSTEM_ENGINEERING
  ];
  
  return directionalTypes.includes(interactionType);
};

/**
 * Determines if an interaction is bidirectional (affects both species)
 * @param {string} interactionType - The type of interaction
 * @returns {boolean} - Whether the interaction is bidirectional
 */
export const isBidirectionalInteraction = (interactionType) => {
  const bidirectionalTypes = [
    INTERACTION_TYPES.NON_TROPHIC.COMPETITION,
    INTERACTION_TYPES.NON_TROPHIC.INTERFERENCE,
    INTERACTION_TYPES.NON_TROPHIC.MUTUALISM
  ];
  
  return bidirectionalTypes.includes(interactionType);
};

/**
 * Calculates the effect of an interaction on a species
 * @param {Object} interaction - The interaction object
 * @param {string} speciesId - The ID of the species to calculate effect for
 * @param {Object} foodWeb - The current food web state
 * @returns {number} - The calculated effect on the species growth rate
 */
export const calculateInteractionEffect = (interaction, speciesId, foodWeb) => {
  const isSource = interaction.source === speciesId;
  const otherSpeciesId = isSource ? interaction.target : interaction.source;
  const otherSpecies = foodWeb.nodes.find(node => node.id === otherSpeciesId);
  
  if (!otherSpecies) return 0;
  
  // Base effect is influenced by interaction strength and other species population
  const baseEffect = interaction.strength * (otherSpecies.population / 100);
  
  // Apply environmental modifiers if specified
  let environmentalModifier = 1.0;
  if (interaction.environmentalDependency && interaction.environmentalDependency.length > 0) {
    // This would be expanded to include actual environmental factor calculations
    environmentalModifier = 0.8 + (Math.random() * 0.4); // Simplified for now
  }
  
  // Apply seasonal modifiers if specified
  let seasonalModifier = 1.0;
  if (interaction.seasonality && interaction.seasonality !== 'all_year') {
    // This would be expanded to include actual seasonal calculations
    seasonalModifier = 0.7 + (Math.random() * 0.6); // Simplified for now
  }
  
  // Calculate the final effect based on interaction type and species role
  switch (interaction.interactionType) {
    // Trophic interactions
    case INTERACTION_TYPES.TROPHIC.PREDATION:
      return isSource ? 0.1 * baseEffect * environmentalModifier * seasonalModifier : -0.2 * baseEffect * environmentalModifier * seasonalModifier;
      
    case INTERACTION_TYPES.TROPHIC.HERBIVORY:
      return isSource ? 0.1 * baseEffect * environmentalModifier * seasonalModifier : -0.15 * baseEffect * environmentalModifier * seasonalModifier;
      
    case INTERACTION_TYPES.TROPHIC.PARASITISM:
      return isSource ? 0.05 * baseEffect * environmentalModifier * seasonalModifier : -0.1 * baseEffect * environmentalModifier * seasonalModifier;
      
    case INTERACTION_TYPES.TROPHIC.PARASITOIDISM:
      return isSource ? 0.08 * baseEffect * environmentalModifier * seasonalModifier : -0.15 * baseEffect * environmentalModifier * seasonalModifier;
      
    case INTERACTION_TYPES.TROPHIC.DETRITIVORY:
      return isSource ? 0.07 * baseEffect * environmentalModifier * seasonalModifier : -0.02 * baseEffect * environmentalModifier * seasonalModifier;
      
    // Non-trophic competition interactions
    case INTERACTION_TYPES.NON_TROPHIC.COMPETITION:
      return -0.05 * baseEffect * environmentalModifier * seasonalModifier;
      
    case INTERACTION_TYPES.NON_TROPHIC.INTERFERENCE:
      return -0.08 * baseEffect * environmentalModifier * seasonalModifier;
      
    // Non-trophic mutualistic interactions
    case INTERACTION_TYPES.NON_TROPHIC.MUTUALISM:
      return 0.05 * baseEffect * environmentalModifier * seasonalModifier;
      
    case INTERACTION_TYPES.NON_TROPHIC.POLLINATION:
      return isSource ? 0.03 * baseEffect * environmentalModifier * seasonalModifier : 0.06 * baseEffect * environmentalModifier * seasonalModifier;
      
    case INTERACTION_TYPES.NON_TROPHIC.SEED_DISPERSAL:
      return isSource ? 0.02 * baseEffect * environmentalModifier * seasonalModifier : 0.05 * baseEffect * environmentalModifier * seasonalModifier;
      
    case INTERACTION_TYPES.NON_TROPHIC.PROTECTION:
      return isSource ? 0.01 * baseEffect * environmentalModifier * seasonalModifier : 0.04 * baseEffect * environmentalModifier * seasonalModifier;
      
    // Non-trophic commensalistic interactions
    case INTERACTION_TYPES.NON_TROPHIC.COMMENSALISM:
      return isSource ? 0.05 * baseEffect * environmentalModifier * seasonalModifier : 0;
      
    case INTERACTION_TYPES.NON_TROPHIC.INQUILINISM:
      return isSource ? 0.04 * baseEffect * environmentalModifier * seasonalModifier : 0;
      
    case INTERACTION_TYPES.NON_TROPHIC.PHORESY:
      return isSource ? 0.03 * baseEffect * environmentalModifier * seasonalModifier : 0;
      
    // Non-trophic antagonistic interactions
    case INTERACTION_TYPES.NON_TROPHIC.AMENSALISM:
      return isSource ? -0.05 * baseEffect * environmentalModifier * seasonalModifier : 0;
      
    case INTERACTION_TYPES.NON_TROPHIC.ALLELOPATHY:
      return isSource ? -0.07 * baseEffect * environmentalModifier * seasonalModifier : 0;
      
    // Non-trophic facilitative interactions
    case INTERACTION_TYPES.NON_TROPHIC.FACILITATION:
      return !isSource ? 0.05 * baseEffect * environmentalModifier * seasonalModifier : 0;
      
    case INTERACTION_TYPES.NON_TROPHIC.ECOSYSTEM_ENGINEERING:
      return !isSource ? 0.06 * baseEffect * environmentalModifier * seasonalModifier : 0;
      
    default:
      return 0;
  }
};

/**
 * Calculates the net effect of all interactions on a species
 * @param {Object} species - The species to calculate effects for
 * @param {Object} foodWeb - The current food web state
 * @returns {number} - The net effect of all interactions
 */
export const calculateNetInteractionEffect = (species, foodWeb) => {
  let netEffect = 0;
  
  // Find all interactions involving this species
  const interactions = foodWeb.links.filter(
    link => link.source === species.id || link.target === species.id
  );
  
  // Calculate the effect of each interaction
  interactions.forEach(interaction => {
    netEffect += calculateInteractionEffect(interaction, species.id, foodWeb);
  });
  
  return netEffect;
};

/**
 * Generates a human-readable description of an interaction
 * @param {Object} interaction - The interaction object
 * @param {Array} species - The list of species in the food web
 * @returns {string} - A human-readable description
 */
export const getInteractionDescription = (interaction, species) => {
  const getSpeciesName = (id) => {
    const speciesObj = species.find(s => s.id === id);
    return speciesObj ? speciesObj.name : 'Unknown Species';
  };
  
  const sourceName = getSpeciesName(interaction.source);
  const targetName = getSpeciesName(interaction.target);
  
  switch (interaction.interactionType) {
    // Trophic interactions
    case INTERACTION_TYPES.TROPHIC.PREDATION:
      return `${sourceName} preys on ${targetName}`;
      
    case INTERACTION_TYPES.TROPHIC.HERBIVORY:
      return `${sourceName} feeds on ${targetName}`;
      
    case INTERACTION_TYPES.TROPHIC.PARASITISM:
      return `${sourceName} parasitizes ${targetName}`;
      
    case INTERACTION_TYPES.TROPHIC.PARASITOIDISM:
      return `${sourceName} eventually kills ${targetName} as a parasitoid`;
      
    case INTERACTION_TYPES.TROPHIC.DETRITIVORY:
      return `${sourceName} consumes dead ${targetName}`;
      
    // Non-trophic competition interactions
    case INTERACTION_TYPES.NON_TROPHIC.COMPETITION:
      return `${sourceName} competes with ${targetName}`;
      
    case INTERACTION_TYPES.NON_TROPHIC.INTERFERENCE:
      return `${sourceName} directly interferes with ${targetName}`;
      
    // Non-trophic mutualistic interactions
    case INTERACTION_TYPES.NON_TROPHIC.MUTUALISM:
      return `${sourceName} and ${targetName} benefit each other`;
      
    case INTERACTION_TYPES.NON_TROPHIC.POLLINATION:
      return `${sourceName} pollinates ${targetName}`;
      
    case INTERACTION_TYPES.NON_TROPHIC.SEED_DISPERSAL:
      return `${sourceName} disperses seeds of ${targetName}`;
      
    case INTERACTION_TYPES.NON_TROPHIC.PROTECTION:
      return `${sourceName} protects ${targetName}`;
      
    // Non-trophic commensalistic interactions
    case INTERACTION_TYPES.NON_TROPHIC.COMMENSALISM:
      return `${sourceName} benefits from ${targetName} (neutral)`;
      
    case INTERACTION_TYPES.NON_TROPHIC.INQUILINISM:
      return `${sourceName} uses ${targetName} as habitat`;
      
    case INTERACTION_TYPES.NON_TROPHIC.PHORESY:
      return `${sourceName} uses ${targetName} for transport`;
      
    // Non-trophic antagonistic interactions
    case INTERACTION_TYPES.NON_TROPHIC.AMENSALISM:
      return `${sourceName} is inhibited by ${targetName} (neutral)`;
      
    case INTERACTION_TYPES.NON_TROPHIC.ALLELOPATHY:
      return `${sourceName} is chemically inhibited by ${targetName}`;
      
    // Non-trophic facilitative interactions
    case INTERACTION_TYPES.NON_TROPHIC.FACILITATION:
      return `${sourceName} facilitates ${targetName}`;
      
    case INTERACTION_TYPES.NON_TROPHIC.ECOSYSTEM_ENGINEERING:
      return `${sourceName} modifies habitat for ${targetName}`;
      
    default:
      return `${sourceName} interacts with ${targetName}`;
  }
};