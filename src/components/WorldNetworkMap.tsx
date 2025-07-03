"use client";
import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import { feature } from "topojson-client";

const WorldNetworkMap = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("background-color", "#0d0d1a");

    let projection = d3.geoNaturalEarth1().fitSize([width, height], { type: "Sphere" });
    let path = d3.geoPath().projection(projection);

    const mapGroup = svg.append("g");
    const connectionGroup = svg.append("g");
    const nodeGroup = svg.append("g");

    const defs = svg.append("defs");
    const glow = defs.append("filter").attr("id", "glow");
    glow.append("feGaussianBlur").attr("stdDeviation", "3.5").attr("result", "blur");
    const merge = glow.append("feMerge");
    merge.append("feMergeNode").attr("in", "blur");
    merge.append("feMergeNode").attr("in", "SourceGraphic");

    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then((topoData: any) => {
      console.log("TopoJSON data loaded", topoData);

      const countries = feature(topoData, topoData.objects.countries) as any;

      mapGroup
        .selectAll("path")
        .data(countries.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "#0f3460")
        .attr("stroke", "#1e4973")
        .attr("stroke-width", 0.4);

      const nodes = [
        { name: "Tel Aviv", coords: [34.78, 32.07] },
        { name: "New York", coords: [-74.006, 40.7128] },
        { name: "London", coords: [-0.1276, 51.5072] },
        { name: "Dubai", coords: [55.3, 25.26] },
        { name: "Sydney", coords: [151.2, -33.8] },
      ];

      const connections = [
        ["Tel Aviv", "New York"],
        ["Tel Aviv", "London"],
        ["Tel Aviv", "Dubai"],
        ["London", "New York"],
        ["Dubai", "Sydney"],
        ["New York", "Sydney"],
      ];

      const nodeMap = new Map(nodes.map((n) => [n.name, n.coords]));

      function drawConnections() {
        connectionGroup.selectAll("*").remove();
        connections.forEach(([from, to]) => {
          const source = projection(nodeMap.get(from)!);
          const target = projection(nodeMap.get(to)!);
          if (!source || !target) return;

          const mid = [(source[0] + target[0]) / 2, (source[1] + target[1]) / 2 - 50];
          const d = `M${source[0]},${source[1]} Q${mid[0]},${mid[1]} ${target[0]},${target[1]}`;

          connectionGroup
            .append("path")
            .attr("d", d)
            .attr("fill", "none")
            .attr("stroke", "#00bfff")
            .attr("stroke-width", 0.8)
            .attr("stroke-opacity", 0.6)
            .attr("filter", "url(#glow)")
            .transition()
            .duration(2000)
            .ease(d3.easeLinear)
            .attr("stroke-opacity", 0.2)
            .on("end", function repeat() {
              d3.select(this)
                .transition()
                .duration(2000)
                .attr("stroke-opacity", 0.6)
                .transition()
                .duration(2000)
                .attr("stroke-opacity", 0.2)
                .on("end", repeat);
            });
        });
      }

      function drawNodes() {
        nodeGroup.selectAll("*").remove();

        nodeGroup
          .selectAll("circle")
          .data(nodes)
          .enter()
          .append("circle")
          .attr("cx", (d) => projection(d.coords)?.[0]!)
          .attr("cy", (d) => projection(d.coords)?.[1]!)
          .attr("r", 3.5)
          .attr("fill", "#00ffff")
          .attr("filter", "url(#glow)");
      }

      drawConnections();
      drawNodes();
    }).catch((error) => {
      console.error("Failed to load topojson data", error);
    });

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      svg.attr("viewBox", `0 0 ${width} ${height}`);

      projection = d3.geoNaturalEarth1().fitSize([width, height], { type: "Sphere" });
      path = d3.geoPath().projection(projection);

      mapGroup.selectAll("path").attr("d", path);
      drawConnections();
      drawNodes();
    }

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return <svg ref={svgRef} className="fixed top-0 left-0 w-full h-full z-0" />;
};

export default WorldNetworkMap;