"use client";
import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import { feature } from "topojson-client";

interface Node {
  id: string;
  name: string;
  coordinates: [number, number]; // Properly typed coordinates
}

interface Connection {
  source: string;
  target: string;
}

interface WorldNetworkMapProps {
  nodes: Node[];
  connections: Connection[];
  width?: number;
  height?: number;
}

const WorldNetworkMap: React.FC<WorldNetworkMapProps> = ({
  nodes,
  connections,
  width = 960,
  height = 500,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
      if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    // Debug logging for connections and nodes
    console.log("Connections data:", connections);
    console.log("Nodes data:", nodes);

    const projection = d3
      .geoNaturalEarth1()
      .scale(width / 5.5)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Create base map group
    const mapGroup = svg.append("g").attr("class", "map-group");

    // Create connections group
    const connectionsGroup = svg.append("g").attr("class", "connections-group");

    // Create nodes group
    const nodesGroup = svg.append("g").attr("class", "nodes-group");

    // Drawing functions moved outside of d3.json.then
    // to be accessible to resize()
    const drawConnections = () => {
      // Enhanced guard clause with detailed logging
      if (!connections) {
        console.warn("Cannot draw connections: connections is undefined");
        return;
      }
      
      if (!Array.isArray(connections)) {
        console.warn("Cannot draw connections: connections is not an array", connections);
        return;
      }
      
      if (connections.length === 0) {
        console.log("No connections to draw");
        return;
      }
      
      if (!nodes || !Array.isArray(nodes) || nodes.length === 0) {
        console.warn("Cannot draw connections: nodes is undefined or empty");
        return;
      }

      try {
        connectionsGroup
          .selectAll("line")
          .data(connections)
          .enter()
          .append("line")
          .attr("class", "connection")
          .attr("x1", (d) => {
            if (!d || !d.source) return 0;
            const source = nodes.find((node) => node?.id === d.source);
            if (source?.coordinates) {
              const projected = projection(source.coordinates);
              return projected ? projected[0] : 0;
            }
            return 0;
          })
          .attr("y1", (d) => {
            if (!d || !d.source) return 0;
            const source = nodes.find((node) => node?.id === d.source);
            if (source?.coordinates) {
              const projected = projection(source.coordinates);
              return projected ? projected[1] : 0;
            }
            return 0;
          })
          .attr("x2", (d) => {
            if (!d || !d.target) return 0;
            const target = nodes.find((node) => node?.id === d.target);
            if (target?.coordinates) {
              const projected = projection(target.coordinates);
              return projected ? projected[0] : 0;
            }
            return 0;
          })
          .attr("y2", (d) => {
            if (!d || !d.target) return 0;
            const target = nodes.find((node) => node?.id === d.target);
            if (target?.coordinates) {
              const projected = projection(target.coordinates);
              return projected ? projected[1] : 0;
            }
            return 0;
          })
          .attr("stroke", "#00bfff")
          .attr("stroke-width", 1)
          .attr("opacity", 0.5);
      } catch (error) {
        console.error("Error drawing connections:", error);
      }
    };

    const drawNodes = () => {
      // Enhanced guard clause with detailed logging
      if (!nodes) {
        console.warn("Cannot draw nodes: nodes is undefined");
        return;
      }
      
      if (!Array.isArray(nodes)) {
        console.warn("Cannot draw nodes: nodes is not an array", nodes);
        return;
      }
      
      if (nodes.length === 0) {
        console.log("No nodes to draw");
        return;
      }
      
      try {
        nodesGroup
          .selectAll("circle")
          .data(nodes)
          .enter()
          .append("circle")
          .attr("class", "node")
          .attr("cx", (d) => {
            if (!d || !d.coordinates) return 0;
            const projected = projection(d.coordinates);
            return projected ? projected[0] : 0;
          })
          .attr("cy", (d) => {
            if (!d || !d.coordinates) return 0;
            const projected = projection(d.coordinates);
            return projected ? projected[1] : 0;
          })
          .attr("r", 5)
          .attr("fill", "#00bfff")
          .attr("stroke", "#fff")
          .attr("stroke-width", 1)
          .append("title")
          .text((d) => d?.name || "");
      } catch (error) {
        console.error("Error drawing nodes:", error);
      }
    };

    // Load GeoJSON data
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then((topoData: any) => {
        console.log("TopoJSON data loaded", topoData);

        const countries = feature(topoData, topoData.objects.countries) as any;

        mapGroup
          .selectAll("path")
          .data(countries.features)
          .enter()
          .append("path")
          .attr("d", (d: any) => path(d as GeoJSON.Feature) || '')
          .attr("fill", "#dddddd")
          .attr("stroke", "#ffffff")
          .attr("stroke-width", 0.5);

        // Draw connections and nodes
        drawConnections();
        drawNodes();
      })
      .catch((error) => {
        console.error("Failed to load topojson data", error);
      });

    // Resize function
    const resize = () => {
      // Update projection
      projection.scale(width / 5.5).translate([width / 2, height / 2]);

      // Update country paths
      mapGroup.selectAll("path").attr("d", (d: any) => path(d as GeoJSON.Feature) || '');

      // Update connections and nodes using the now-accessible functions
      drawConnections();
      drawNodes();
    };

    // Add resize event listener
    window.addEventListener("resize", resize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [nodes, connections, width, height]);

  return (
    <svg 
      ref={svgRef} 
      width="100%" 
      height="100%" 
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%' }}
    ></svg>
  );
};

export default WorldNetworkMap;