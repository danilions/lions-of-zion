'use client';

import { useEffect, useRef } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { select } from 'd3-selection';
import { feature } from 'topojson-client';
import { Topology, GeometryCollection } from 'topojson-specification';

interface CityNode {
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
}

const cities: CityNode[] = [
  { name: 'Tel Aviv', coordinates: [34.7818, 32.0853] },
  { name: 'New York', coordinates: [-74.006, 40.7128] },
  { name: 'Dubai', coordinates: [55.2708, 25.2048] },
  { name: 'London', coordinates: [-0.1276, 51.5074] },
  { name: 'Sydney', coordinates: [151.2093, -33.8688] },
];

const WorldNetworkMap = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const renderMap = async () => {
      if (!svgRef.current) return;

      // Clear any previous SVG content
      select(svgRef.current).selectAll('*').remove();

      const svg = select(svgRef.current);
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Set up the projection with increased zoom
      const projection = geoNaturalEarth1()
        .scale(width / 5.5)
        .translate([width / 2, height / 2]);

      const path = geoPath().projection(projection);

      // Create glow filter
      const defs = svg.append('defs');
      
      // Glow filter for cities
      const glowFilter = defs.append('filter')
        .attr('id', 'glow')
        .attr('x', '-50%')
        .attr('y', '-50%')
        .attr('width', '200%')
        .attr('height', '200%');

      glowFilter.append('feGaussianBlur')
        .attr('stdDeviation', '3')
        .attr('result', 'coloredBlur');

      const feMerge = glowFilter.append('feMerge');
      feMerge.append('feMergeNode').attr('in', 'coloredBlur');
      feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

      // Pulse animation filter
      const pulseFilter = defs.append('filter')
        .attr('id', 'pulse')
        .attr('x', '-100%')
        .attr('y', '-100%')
        .attr('width', '300%')
        .attr('height', '300%');

      pulseFilter.append('feGaussianBlur')
        .attr('stdDeviation', '2')
        .attr('result', 'coloredBlur');

      const pulseMerge = pulseFilter.append('feMerge');
      pulseMerge.append('feMergeNode').attr('in', 'coloredBlur');
      pulseMerge.append('feMergeNode').attr('in', 'SourceGraphic');

      // Line glow filter for connections
      const lineGlowFilter = defs.append('filter')
        .attr('id', 'lineGlow')
        .attr('x', '-50%')
        .attr('y', '-50%')
        .attr('width', '200%')
        .attr('height', '200%');

      lineGlowFilter.append('feGaussianBlur')
        .attr('stdDeviation', '4')
        .attr('result', 'coloredBlur');

      const lineGlowMerge = lineGlowFilter.append('feMerge');
      lineGlowMerge.append('feMergeNode').attr('in', 'coloredBlur');
      lineGlowMerge.append('feMergeNode').attr('in', 'SourceGraphic');

      try {
        // Load world atlas data from locally installed package
        const world = await import('world-atlas/countries-110m.json').then(module => module.default) as Topology;
        
        // Convert topojson to geojson
        const countries = feature(world, world.objects.countries as GeometryCollection);

        // Render countries
        svg.selectAll('.country')
          .data(countries.features)
          .enter()
          .append('path')
          .attr('class', 'country')
          .attr('d', path as unknown as string)
          .style('fill', '#0A1327')
          .style('stroke', '#ffffff')
          .style('stroke-width', '0.5px')
          .style('stroke-opacity', '0.3');

        // Add connection lines between cities
        const connections = [
          [cities[0], cities[1]], // Tel Aviv to New York
          [cities[1], cities[3]], // New York to London
          [cities[3], cities[2]], // London to Dubai
          [cities[2], cities[4]], // Dubai to Sydney
          [cities[0], cities[2]], // Tel Aviv to Dubai
        ];

        svg.selectAll('.connection')
          .data(connections)
          .enter()
          .append('line')
          .attr('class', 'connection')
          .attr('x1', d => {
            const coords = projection(d[0].coordinates);
            return coords ? coords[0] : 0;
          })
          .attr('y1', d => {
            const coords = projection(d[0].coordinates);
            return coords ? coords[1] : 0;
          })
          .attr('x2', d => {
            const coords = projection(d[1].coordinates);
            return coords ? coords[0] : 0;
          })
          .attr('y2', d => {
            const coords = projection(d[1].coordinates);
            return coords ? coords[1] : 0;
          })
          .style('stroke', '#00ffff')
          .style('stroke-width', '2px')
          .style('stroke-opacity', '0.6')
          .style('filter', 'url(#lineGlow)');

        // Render city nodes
        svg.selectAll('.city')
          .data(cities)
          .enter()
          .append('circle')
          .attr('class', 'city')
          .attr('cx', d => {
            const coords = projection(d.coordinates);
            return coords ? coords[0] : 0;
          })
          .attr('cy', d => {
            const coords = projection(d.coordinates);
            return coords ? coords[1] : 0;
          })
          .attr('r', 4)
          .style('fill', '#00ffff')
          .style('filter', 'url(#glow)')
          .style('opacity', '0.9');

        // Add pulsing rings around cities
        svg.selectAll('.city-ring')
          .data(cities)
          .enter()
          .append('circle')
          .attr('class', 'city-ring')
          .attr('cx', d => {
            const coords = projection(d.coordinates);
            return coords ? coords[0] : 0;
          })
          .attr('cy', d => {
            const coords = projection(d.coordinates);
            return coords ? coords[1] : 0;
          })
          .attr('r', 8)
          .style('fill', 'none')
          .style('stroke', '#00ffff')
          .style('stroke-width', '1px')
          .style('stroke-opacity', '0.5')
          .style('filter', 'url(#pulse)')
          .style('animation', 'pulse 2s infinite');

        // Add CSS animation keyframes to the document
        const style = document.createElement('style');
        style.textContent = `
          @keyframes pulse {
            0% { r: 8; stroke-opacity: 0.5; }
            50% { r: 12; stroke-opacity: 0.8; }
            100% { r: 8; stroke-opacity: 0.5; }
          }
          @keyframes flow {
            0% { stroke-dasharray: 0 20; stroke-opacity: 0.3; }
            50% { stroke-dasharray: 10 10; stroke-opacity: 0.6; }
            100% { stroke-dasharray: 20 0; stroke-opacity: 0.3; }
          }
        `;
        document.head.appendChild(style);

        // Add city labels
        svg.selectAll('.city-label')
          .data(cities)
          .enter()
          .append('text')
          .attr('class', 'city-label')
          .attr('x', d => {
            const coords = projection(d.coordinates);
            return coords ? coords[0] + 12 : 0;
          })
          .attr('y', d => {
            const coords = projection(d.coordinates);
            return coords ? coords[1] + 4 : 0;
          })
          .text(d => d.name)
          .style('fill', '#00ffff')
          .style('font-size', '12px')
          .style('font-family', 'Arial, sans-serif')
          .style('text-shadow', '0 0 10px #00ffff')
          .style('opacity', '0.8');

      } catch (error) {
        console.error('Error loading world data:', error);
      }
    };

    renderMap();

    // Handle window resize
    const handleResize = () => {
      renderMap();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      backgroundColor: '#050E1D',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    }}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default WorldNetworkMap;
