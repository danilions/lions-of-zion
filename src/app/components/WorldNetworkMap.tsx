'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import type { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';

interface InfluencePoint {
  id: string;
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
}

interface WorldNetworkMapProps {
  regions?: any[];
  showConnections?: boolean;
  showNodes?: boolean;
  animateConnections?: boolean;
  onRegionClick?: (region: any) => void;
  onNodeClick?: (node: any) => void;
}

// Strategic influence points
const influencePoints: InfluencePoint[] = [
  { id: 'israel', name: 'Israel', coordinates: [35.2137, 31.7683] },
  { id: 'nyc', name: 'New York City', coordinates: [-74.0060, 40.7128] },
  { id: 'dubai', name: 'Dubai', coordinates: [55.2708, 25.2048] },
  { id: 'london', name: 'London', coordinates: [-0.1276, 51.5074] },
  { id: 'sydney', name: 'Sydney', coordinates: [151.2093, -33.8688] },
];

const WorldNetworkMap: React.FC<WorldNetworkMapProps> = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({ 
          width: clientWidth || window.innerWidth, 
          height: clientHeight || window.innerHeight 
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0 || dimensions.height === 0) return;

    // Clear previous render
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);
    const { width, height } = dimensions;

    // Set up projection
    const projection = d3.geoNaturalEarth1()
      .scale(width / 6.5)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Add glow filter definition
    const defs = svg.append('defs');
    const filter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');

    filter.append('feGaussianBlur')
      .attr('stdDeviation', '3.5')
      .attr('result', 'coloredBlur');

    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Load world data
    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then((world: any) => {
        if (!world || !world.objects || !world.objects.countries) {
          console.error('Invalid world data structure');
          return;
        }

        // Convert TopoJSON to GeoJSON
        const countries = feature(world, world.objects.countries) as unknown as FeatureCollection<Geometry, GeoJsonProperties>;

        // Draw countries
        svg.selectAll('path')
          .data(countries.features)
          .enter()
          .append('path')
          .attr('d', (d: any) => path(d))
          .attr('fill', '#0f3460')
          .attr('stroke', '#1e3a8a')
          .attr('stroke-width', 0.5)
          .attr('opacity', 0.8);

        // Draw influence points
        svg.selectAll('circle')
          .data(influencePoints)
          .enter()
          .append('circle')
          .attr('cx', d => {
            const coords = projection(d.coordinates);
            return coords ? coords[0] : 0;
          })
          .attr('cy', d => {
            const coords = projection(d.coordinates);
            return coords ? coords[1] : 0;
          })
          .attr('r', 6)
          .attr('fill', '#00bfff')
          .attr('stroke', '#00bfff')
          .attr('stroke-width', 2)
          .attr('filter', 'url(#glow)')
          .style('cursor', 'pointer')
          .on('mouseover', function(event, d) {
            d3.select(this)
              .transition()
              .duration(200)
              .attr('r', 8);
          })
          .on('mouseout', function(event, d) {
            d3.select(this)
              .transition()
              .duration(200)
              .attr('r', 6);
          });

        // Add labels for influence points
        svg.selectAll('text')
          .data(influencePoints)
          .enter()
          .append('text')
          .attr('x', d => {
            const coords = projection(d.coordinates);
            return coords ? coords[0] : 0;
          })
          .attr('y', d => {
            const coords = projection(d.coordinates);
            return coords ? coords[1] - 12 : 0;
          })
          .attr('text-anchor', 'middle')
          .attr('fill', '#00bfff')
          .attr('font-size', '12px')
          .attr('font-weight', 'bold')
          .attr('filter', 'url(#glow)')
          .text(d => d.name);
      })
      .catch(error => {
        console.error('Error loading world data:', error);
      });

  }, [dimensions]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full bg-black overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full"
      />
    </div>
  );
};

export default WorldNetworkMap;
