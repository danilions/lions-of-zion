# WorldNetworkMap Component

A React 18 functional component that renders a fullscreen interactive world map with glowing city nodes.

## Features

- **Fullscreen SVG World Map**: Uses D3's `geoNaturalEarth1` projection for a natural-looking world representation
- **TopoJSON Data**: Loads country data from world-atlas@2 and converts it to GeoJSON
- **Glowing City Nodes**: Five major cities (Tel Aviv, New York, Dubai, London, Sydney) with neon glow effects
- **Network Connections**: Visual connections between cities with subtle animations
- **Responsive Design**: Automatically adapts to window size changes
- **Dark Theme**: Dark background (#050E1D) with subtle white country borders

## Usage

```tsx
import WorldNetworkMap from '@/components/WorldNetworkMap';

export default function MapPage() {
  return <WorldNetworkMap />;
}
```

## Cities Displayed

- Tel Aviv (32.0853°N, 34.7818°E)
- New York (40.7128°N, 74.006°W)
- Dubai (25.2048°N, 55.2708°E)
- London (51.5074°N, 0.1276°W)
- Sydney (33.8688°S, 151.2093°E)

## Dependencies

- `d3-geo`: For map projections and path generation
- `d3-selection`: For DOM manipulation
- `topojson-client`: For converting TopoJSON to GeoJSON
- `world-atlas`: For world country data

## Features

### Visual Effects
- Custom SVG filters for glowing effects
- Pulsing rings around city nodes
- Flowing animations on connection lines
- Subtle white borders on countries (#0A1327 fill)

### Responsive Behavior
- Automatically redraws on window resize
- Maintains aspect ratio and centering
- Clears previous SVG content before re-rendering

## Component Architecture

The component uses:
- `useRef` for SVG DOM manipulation
- `useEffect` for initialization and cleanup
- D3.js for geographic projections and rendering
- Event listeners for responsive behavior

## Styling

The map uses a dark theme with:
- Background: `#050E1D`
- Countries: `#0A1327` fill with white borders
- Cities: Cyan (`#00ffff`) with glow effects
- Connections: Semi-transparent cyan lines

## Performance

The component efficiently handles:
- Single data fetch from world-atlas CDN
- Efficient D3 rendering patterns
- Proper cleanup on unmount
- Optimized SVG element creation
