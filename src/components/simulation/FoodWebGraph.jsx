import React, { useRef, useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import InfoIcon from '@mui/icons-material/Info';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

// Import the ecological interactions model
import { 
  INTERACTION_COLORS, 
  INTERACTION_TYPE_LIST,
  isDirectionalInteraction,
  isBidirectionalInteraction
} from '../../models/EcologicalInteractions';

// Define colors for different trophic levels
const TROPHIC_COLORS = {
  producer: '#27ae60', // green
  primary_consumer: '#f39c12', // orange
  secondary_consumer: '#e74c3c', // red
  tertiary_consumer: '#8e44ad', // purple
  decomposer: '#3498db', // blue
};

// We're using the imported INTERACTION_COLORS from our model

const FoodWebGraph = ({ data, simulationStatus, onAddInteraction, onRemoveInteraction }) => {
  const graphRef = useRef();
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  
  // Handle zoom controls
  const handleZoomIn = () => {
    if (graphRef.current) {
      const currentZoom = graphRef.current.zoom();
      graphRef.current.zoom(currentZoom * 1.2, 400);
    }
  };
  
  const handleZoomOut = () => {
    if (graphRef.current) {
      const currentZoom = graphRef.current.zoom();
      graphRef.current.zoom(currentZoom * 0.8, 400);
    }
  };
  
  const handleResetView = () => {
    if (graphRef.current) {
      graphRef.current.centerAt(0, 0);
      graphRef.current.zoom(1, 800);
    }
  };
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  // Handle node selection for creating interactions
  const handleNodeClick = (node) => {
    if (selectedNodes.includes(node)) {
      // Deselect if already selected
      setSelectedNodes(selectedNodes.filter(n => n.id !== node.id));
    } else {
      // Add to selection (max 2 nodes)
      const newSelectedNodes = [...selectedNodes, node].slice(-2);
      setSelectedNodes(newSelectedNodes);
      
      // If we have 2 nodes selected, prompt to create an interaction
      if (newSelectedNodes.length === 2) {
        // This would typically open a dialog to select interaction type
        // For now, we'll just create a predation link as an example
        // In a real implementation, you'd want to show a UI for selecting the interaction type
        console.log(`Selected nodes: ${newSelectedNodes[0].name} and ${newSelectedNodes[1].name}`);
      }
    }
  };
  
  // Handle node hover
  const handleNodeHover = (node) => {
    setHoveredNode(node);
    if (graphRef.current) {
      graphRef.current.centerAt();
    }
  };
  
  // Handle link hover
  const handleLinkHover = (link) => {
    setHoveredLink(link);
  };
  
  // Custom node rendering
  const nodeCanvasObject = (node, ctx, globalScale) => {
    const label = node.name;
    const fontSize = 12/globalScale;
    const nodeSize = node.biomass ? Math.sqrt(node.biomass) * 5 : 10;
    
    // Node color based on trophic level
    const color = TROPHIC_COLORS[node.trophicLevel] || '#777';
    
    // Draw node
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeSize, 0, 2 * Math.PI);
    ctx.fillStyle = selectedNodes.includes(node) ? '#fff' : color;
    ctx.fill();
    ctx.strokeStyle = selectedNodes.includes(node) ? color : '#fff';
    ctx.lineWidth = selectedNodes.includes(node) ? 3 : 1.5;
    ctx.stroke();
    
    // Draw label
    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText(label, node.x, node.y + nodeSize + fontSize);
  };
  
  // Custom link rendering
  const linkCanvasObject = (link, ctx, globalScale) => {
    // Draw link
    const start = link.source;
    const end = link.target;
    
    if (typeof start !== 'object' || typeof end !== 'object') return;
    
    // Calculate start and end points
    const startRadius = start.biomass ? Math.sqrt(start.biomass) * 5 : 10;
    const endRadius = end.biomass ? Math.sqrt(end.biomass) * 5 : 10;
    
    // Calculate direction vector
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    
    // Normalize direction vector
    const unitDx = dx / length;
    const unitDy = dy / length;
    
    // Calculate start and end points adjusted for node radius
    const startX = start.x + unitDx * startRadius;
    const startY = start.y + unitDy * startRadius;
    const endX = end.x - unitDx * endRadius;
    const endY = end.y - unitDy * endRadius;
    
    // Link color based on interaction type
    const color = INTERACTION_COLORS[link.interactionType] || '#999';
    
    // Draw link
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = hoveredLink === link ? '#fff' : color;
    ctx.lineWidth = hoveredLink === link ? 3 : 2;
    ctx.stroke();
    
    // Draw arrow for directed interactions using our model's helper function
    if (isDirectionalInteraction(link.interactionType)) {
      const arrowLength = 10 / globalScale;
      const arrowWidth = 5 / globalScale;
      
      // Calculate arrow position (slightly before the end point)
      const arrowX = endX - unitDx * arrowLength;
      const arrowY = endY - unitDy * arrowLength;
      
      // Calculate perpendicular vector for arrow width
      const perpDx = -unitDy;
      const perpDy = unitDx;
      
      // Draw arrow
      ctx.beginPath();
      ctx.moveTo(endX, endY);
      ctx.lineTo(
        arrowX + perpDx * arrowWidth,
        arrowY + perpDy * arrowWidth
      );
      ctx.lineTo(
        arrowX - perpDx * arrowWidth,
        arrowY - perpDy * arrowWidth
      );
      ctx.fillStyle = hoveredLink === link ? '#fff' : color;
      ctx.fill();
    }
    
    // Draw bidirectional arrows for interactions that affect both species
    if (isBidirectionalInteraction(link.interactionType)) {
      const arrowLength = 8 / globalScale;
      const arrowWidth = 4 / globalScale;
      
      // Draw arrow at the end
      const endArrowX = endX - unitDx * arrowLength;
      const endArrowY = endY - unitDy * arrowLength;
      
      // Calculate perpendicular vector for arrow width
      const perpDx = -unitDy;
      const perpDy = unitDx;
      
      // Draw end arrow
      ctx.beginPath();
      ctx.moveTo(endX, endY);
      ctx.lineTo(
        endArrowX + perpDx * arrowWidth,
        endArrowY + perpDy * arrowWidth
      );
      ctx.lineTo(
        endArrowX - perpDx * arrowWidth,
        endArrowY - perpDy * arrowWidth
      );
      ctx.fillStyle = hoveredLink === link ? '#fff' : color;
      ctx.fill();
      
      // Draw arrow at the start
      const startArrowX = startX + unitDx * arrowLength;
      const startArrowY = startY + unitDy * arrowLength;
      
      // Draw start arrow
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(
        startArrowX + perpDx * arrowWidth,
        startArrowY + perpDy * arrowWidth
      );
      ctx.lineTo(
        startArrowX - perpDx * arrowWidth,
        startArrowY - perpDy * arrowWidth
      );
      ctx.fillStyle = hoveredLink === link ? '#fff' : color;
      ctx.fill();
    }
  };
  
  return (
    <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
      {/* Graph controls */}
      <Paper 
        elevation={2} 
        sx={{ 
          position: 'absolute', 
          top: 10, 
          right: 10, 
          zIndex: 1000,
          p: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(255, 255, 255, 0.8)'
        }}
      >
        <Tooltip title="Zoom In">
          <IconButton size="small" onClick={handleZoomIn}>
            <ZoomInIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Zoom Out">
          <IconButton size="small" onClick={handleZoomOut}>
            <ZoomOutIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Reset View">
          <IconButton size="small" onClick={handleResetView}>
            <RestartAltIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
          <IconButton size="small" onClick={toggleFullscreen}>
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Graph Legend">
          <IconButton size="small" onClick={() => setInfoDialogOpen(true)}>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </Paper>
      
      {/* Node info tooltip */}
      {hoveredNode && (
        <Paper 
          elevation={3} 
          sx={{ 
            position: 'absolute', 
            top: 10, 
            left: 10, 
            zIndex: 1000,
            p: 1.5,
            maxWidth: 250,
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          <Typography variant="subtitle1" gutterBottom>
            {hoveredNode.name}
          </Typography>
          <Typography variant="body2">
            <strong>Scientific Name:</strong> {hoveredNode.scientificName}
          </Typography>
          <Typography variant="body2">
            <strong>Trophic Level:</strong> {hoveredNode.trophicLevel?.replace('_', ' ')}
          </Typography>
          <Typography variant="body2">
            <strong>Biomass:</strong> {hoveredNode.biomass?.toFixed(2)} kg/m²
          </Typography>
          <Typography variant="body2">
            <strong>Growth Rate:</strong> {hoveredNode.growthRate?.toFixed(3)}
          </Typography>
        </Paper>
      )}
      
      {/* Link info tooltip */}
      {hoveredLink && (
        <Paper 
          elevation={3} 
          sx={{ 
            position: 'absolute', 
            bottom: 10, 
            left: 10, 
            zIndex: 1000,
            p: 1.5,
            maxWidth: 250,
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          <Typography variant="subtitle1" gutterBottom>
            {hoveredLink.interactionType?.charAt(0).toUpperCase() + hoveredLink.interactionType?.slice(1)}
          </Typography>
          <Typography variant="body2">
            <strong>From:</strong> {typeof hoveredLink.source === 'object' ? hoveredLink.source.name : ''}
          </Typography>
          <Typography variant="body2">
            <strong>To:</strong> {typeof hoveredLink.target === 'object' ? hoveredLink.target.name : ''}
          </Typography>
          <Typography variant="body2">
            <strong>Strength:</strong> {hoveredLink.strength?.toFixed(2)}
          </Typography>
        </Paper>
      )}
      
      {/* Selection info */}
      {selectedNodes.length > 0 && (
        <Paper 
          elevation={3} 
          sx={{ 
            position: 'absolute', 
            bottom: 10, 
            right: 10, 
            zIndex: 1000,
            p: 1.5,
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          <Typography variant="body2">
            {selectedNodes.length === 1 
              ? `Selected: ${selectedNodes[0].name}. Select another species to create an interaction.` 
              : `Selected: ${selectedNodes[0].name} and ${selectedNodes[1].name}`}
          </Typography>
          {selectedNodes.length === 2 && (
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                size="small" 
                variant="outlined" 
                onClick={() => setSelectedNodes([])}
              >
                Cancel
              </Button>
              <Button 
                size="small" 
                variant="contained" 
                onClick={() => {
                  // This would typically open a dialog to select interaction type
                  // For now, we'll just create a predation link as an example
                  onAddInteraction({
                    source: selectedNodes[0].id,
                    target: selectedNodes[1].id,
                    interactionType: 'predation',
                    strength: 0.5
                  });
                  setSelectedNodes([]);
                }}
              >
                Create Link
              </Button>
            </Box>
          )}
        </Paper>
      )}
      
      {/* Force Graph */}
      <ForceGraph2D
        ref={graphRef}
        graphData={data}
        nodeLabel={node => `${node.name} (${node.trophicLevel})`}
        linkLabel={link => `${link.interactionType} (strength: ${link.strength?.toFixed(2)})`}
        nodeCanvasObject={nodeCanvasObject}
        linkCanvasObject={linkCanvasObject}
        linkDirectionalParticles={4}
        linkDirectionalParticleSpeed={d => d.strength * 0.01}
        linkDirectionalParticleWidth={2}
        linkDirectionalParticleColor={() => '#fff'}
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
        onLinkHover={handleLinkHover}
        cooldownTicks={100}
        onEngineStop={() => console.log('Engine stopped')}
        width={isFullscreen ? window.innerWidth : undefined}
        height={isFullscreen ? window.innerHeight - 100 : undefined}
      />
      
      {/* Legend Dialog */}
      <Dialog
        open={infoDialogOpen}
        onClose={() => setInfoDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Food Web Graph Legend</DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6" gutterBottom>
            Node Colors (Trophic Levels)
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {Object.entries(TROPHIC_COLORS).map(([level, color]) => (
              <Box 
                key={level} 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mr: 2,
                  mb: 1 
                }}
              >
                <Box 
                  sx={{ 
                    width: 16, 
                    height: 16, 
                    borderRadius: '50%', 
                    bgcolor: color,
                    mr: 1 
                  }} 
                />
                <Typography variant="body2">
                  {level.replace('_', ' ')}
                </Typography>
              </Box>
            ))}
          </Box>
          
          <Typography variant="h6" gutterBottom>
            Link Colors (Interaction Types)
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
            <Typography variant="subtitle2">Trophic Interactions</Typography>
            {INTERACTION_TYPE_LIST
              .filter(item => item.category === 'trophic')
              .map(item => (
              <Box 
                key={item.value} 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mr: 2,
                  mb: 1 
                }}
              >
                <Box 
                  sx={{ 
                    width: 16, 
                    height: 3, 
                    bgcolor: INTERACTION_COLORS[item.value],
                    mr: 1 
                  }} 
                />
                <Typography variant="body2">
                  {item.label}
                </Typography>
              </Box>
            ))}
            
            <Typography variant="subtitle2" sx={{ mt: 1 }}>Non-Trophic Interactions</Typography>
            {INTERACTION_TYPE_LIST
              .filter(item => item.category === 'non-trophic')
              .map(item => (
              <Box 
                key={item.value} 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mr: 2,
                  mb: 1 
                }}
              >
                <Box 
                  sx={{ 
                    width: 16, 
                    height: 3, 
                    bgcolor: INTERACTION_COLORS[item.value],
                    mr: 1 
                  }} 
                />
                <Typography variant="body2">
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
          
          <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
            Interactions
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Node Size:</strong> Represents the biomass of the species. Larger nodes indicate higher biomass.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Link Direction:</strong> For directed interactions (predation, herbivory, parasitism), arrows indicate the direction of energy flow or effect.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Link Particles:</strong> Moving particles on links represent the strength and activity of the interaction.
          </Typography>
          <Typography variant="body2">
            <strong>Creating Links:</strong> Select two nodes to create an interaction between them.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInfoDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FoodWebGraph;