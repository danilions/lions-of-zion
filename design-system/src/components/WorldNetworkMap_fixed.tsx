import React, { useState, useMemo, useCallback } from "react";

// Types for our advanced map system
interface NetworkNode {
  id: string;
  name: string;
  coordinates: [number, number];
  type: 'major' | 'minor' | 'hub';
  connections: string[];
  data?: Record<string, any>;
}

interface RegionData {
  id: string;
  name: string;
  path: string;
  centroid: [number, number];
  nodes: NetworkNode[];
  color: string;
  priority: number;
}

interface WorldNetworkMapProps {
  regions?: RegionData[];
  showConnections?: boolean;
  showNodes?: boolean;
  animateConnections?: boolean;
  onRegionClick?: (region: RegionData) => void;
  onNodeClick?: (node: NetworkNode) => void;
}

// Simplified high-precision world map data
const defaultRegions: RegionData[] = [
  {
    id: 'north-america',
    name: 'North America',
    centroid: [-100, 45],
    color: '#3b82f6',
    priority: 1,
    path: 'M50,120 Q45,115 35,110 L20,105 Q10,100 5,90 L2,80 Q0,70 5,60 L10,50 Q20,40 35,35 L50,30 Q70,25 90,28 L110,32 Q130,36 145,45 L160,55 Q170,65 175,80 L180,95 Q185,110 180,125 L175,140 Q165,150 150,155 L130,160 Q110,162 90,158 L70,154 Q55,148 48,135 L45,125 Q44,120 50,120 Z',
    nodes: [
      { id: 'ny', name: 'New York', coordinates: [-74, 40.7], type: 'hub', connections: ['london', 'tokyo', 'la'] },
      { id: 'la', name: 'Los Angeles', coordinates: [-118.2, 34.1], type: 'major', connections: ['ny', 'tokyo', 'sydney'] },
      { id: 'toronto', name: 'Toronto', coordinates: [-79.4, 43.7], type: 'major', connections: ['ny', 'london'] },
    ]
  },
  {
    id: 'europe',
    name: 'Europe',
    centroid: [10, 50],
    color: '#10b981',
    priority: 2,
    path: 'M420,180 Q415,175 405,170 L390,165 Q380,160 375,150 L372,140 Q370,130 375,120 L380,110 Q390,100 405,95 L420,90 Q440,85 460,88 L480,92 Q500,96 515,105 L530,115 Q540,125 545,140 L550,155 Q555,170 550,185 L545,200 Q535,210 520,215 L500,220 Q480,222 460,218 L440,214 Q425,208 418,195 L415,185 Q414,180 420,180 Z',
    nodes: [
      { id: 'london', name: 'London', coordinates: [-0.1, 51.5], type: 'hub', connections: ['ny', 'paris', 'berlin'] },
      { id: 'paris', name: 'Paris', coordinates: [2.3, 48.9], type: 'major', connections: ['london', 'berlin'] },
      { id: 'berlin', name: 'Berlin', coordinates: [13.4, 52.5], type: 'major', connections: ['london', 'paris'] },
    ]
  },
  {
    id: 'asia-pacific',
    name: 'Asia Pacific',
    centroid: [120, 25],
    color: '#f59e0b',
    priority: 3,
    path: 'M600,100 Q595,95 585,90 L570,85 Q560,80 555,70 L552,60 Q550,50 555,40 L560,30 Q570,20 585,15 L600,10 Q620,5 640,8 L660,12 Q680,16 695,25 L710,35 Q720,45 725,60 L730,75 Q735,90 730,105 L725,120 Q715,130 700,135 L680,140 Q660,142 640,138 L620,134 Q605,128 598,115 L595,105 Q594,100 600,100 Z',
    nodes: [
      { id: 'tokyo', name: 'Tokyo', coordinates: [139.7, 35.7], type: 'hub', connections: ['ny', 'la', 'shanghai'] },
      { id: 'shanghai', name: 'Shanghai', coordinates: [121.5, 31.2], type: 'major', connections: ['tokyo', 'singapore'] },
      { id: 'singapore', name: 'Singapore', coordinates: [103.8, 1.3], type: 'major', connections: ['shanghai', 'sydney'] },
      { id: 'sydney', name: 'Sydney', coordinates: [151.2, -33.9], type: 'major', connections: ['la', 'singapore'] },
    ]
  }
];

// Geometric utilities
const projectCoordinate = (coord: [number, number], width: number, height: number): [number, number] => {
  const [lng, lat] = coord;
  const x = ((lng + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return [x, y];
};

const generateConnectionPath = (start: [number, number], end: [number, number]): string => {
  const [x1, y1] = start;
  const [x2, y2] = end;
  
  const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  
  const curvature = Math.min(distance * 0.25, 80);
  const perpX = -(y2 - y1) / distance * curvature;
  const perpY = (x2 - x1) / distance * curvature;
  
  const control1X = x1 + (midX - x1) * 0.5 + perpX * 0.5;
  const control1Y = y1 + (midY - y1) * 0.5 + perpY * 0.5;
  const control2X = x2 + (midX - x2) * 0.5 + perpX * 0.5;
  const control2Y = y2 + (midY - y2) * 0.5 + perpY * 0.5;
  
  return `M ${x1},${y1} C ${control1X},${control1Y} ${control2X},${control2Y} ${x2},${y2}`;
};

const WorldNetworkMap: React.FC<WorldNetworkMapProps> = ({
  regions = defaultRegions,
  showConnections = true,
  showNodes = true,
  animateConnections = true,
  onRegionClick,
  onNodeClick
}) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [animationTime, setAnimationTime] = useState(0);
  const [scanlinePosition, setScanlinePosition] = useState(0);

  // SVG dimensions
  const width = 1400;
  const height = 700;

  // Memoized calculations
  const allNodes = useMemo(() => {
    return regions.flatMap(region => 
      region.nodes.map(node => ({
        ...node,
        regionId: region.id,
        regionColor: region.color,
        projectedCoords: projectCoordinate(node.coordinates, width, height)
      }))
    );
  }, [regions, width, height]);

  const connections = useMemo(() => {
    const connectionPairs: Array<{
      id: string;
      source: typeof allNodes[0];
      target: typeof allNodes[0];
      path: string;
    }> = [];

    allNodes.forEach(sourceNode => {
      sourceNode.connections.forEach(targetId => {
        const targetNode = allNodes.find(n => n.id === targetId);
        if (targetNode && !connectionPairs.some(c => 
          (c.source.id === sourceNode.id && c.target.id === targetId) ||
          (c.source.id === targetId && c.target.id === sourceNode.id)
        )) {
          connectionPairs.push({
            id: `${sourceNode.id}-${targetId}`,
            source: sourceNode,
            target: targetNode,
            path: generateConnectionPath(sourceNode.projectedCoords, targetNode.projectedCoords)
          });
        }
      });
    });

    return connectionPairs;
  }, [allNodes]);

  // Animation loop
  React.useEffect(() => {
    if (!animateConnections) return;
    
    const interval = setInterval(() => {
      setAnimationTime(prev => (prev + 1) % 200);
      setScanlinePosition(prev => (prev + 2) % height);
    }, 50);

    return () => clearInterval(interval);
  }, [animateConnections, height]);

  // Event handlers
  const handleRegionClick = useCallback((region: RegionData) => {
    setSelectedRegion(prev => prev === region.id ? null : region.id);
    onRegionClick?.(region);
  }, [onRegionClick]);

  const handleNodeClick = useCallback((node: NetworkNode) => {
    setSelectedNode(prev => prev === node.id ? null : node.id);
    onNodeClick?.(node);
  }, [onNodeClick]);

  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, #1e293b 0%, #0f172a 100%)' }}
      >
        <defs>
          {/* Grid pattern */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#334155"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </pattern>

          {/* Connection animation gradients */}
          <linearGradient id="connectionFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="transparent" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-200 0;200 0;-200 0"
              dur="4s"
              repeatCount="indefinite"
            />
          </linearGradient>

          {/* Glow effects */}
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="regionGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background grid */}
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Regions */}
        {regions.map((region) => (
          <g key={region.id}>
            <path
              d={region.path}
              fill={hoveredRegion === region.id ? '#facc15' : region.color}
              fillOpacity={selectedRegion === region.id ? 0.9 : 0.6}
              stroke={selectedRegion === region.id ? '#f59e0b' : hoveredRegion === region.id ? '#facc15' : '#64748b'}
              strokeWidth={selectedRegion === region.id ? 4 : hoveredRegion === region.id ? 3 : 1.5}
              filter={hoveredRegion === region.id || selectedRegion === region.id ? 'url(#regionGlow)' : undefined}
              className="cursor-pointer transition-all duration-500 ease-in-out"
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => handleRegionClick(region)}
              transform={`translate(${width * 0.05}, ${height * 0.05}) scale(0.9)`}
            />
            
            <text
              x={projectCoordinate(region.centroid, width, height)[0]}
              y={projectCoordinate(region.centroid, width, height)[1]}
              textAnchor="middle"
              className="text-sm font-mono fill-slate-200 pointer-events-none select-none font-bold"
              opacity={hoveredRegion === region.id ? 1 : 0.8}
            >
              {region.name.toUpperCase()}
            </text>
          </g>
        ))}

        {/* Network connections */}
        {showConnections && connections.map((connection) => (
          <g key={connection.id}>
            <path
              d={connection.path}
              fill="none"
              stroke="#475569"
              strokeWidth="1.5"
              opacity="0.4"
              strokeDasharray="2,2"
            />
            
            {animateConnections && (
              <path
                d={connection.path}
                fill="none"
                stroke="url(#connectionFlow)"
                strokeWidth="3"
                opacity="0.9"
              />
            )}
            
            {(hoveredNode === connection.source.id || hoveredNode === connection.target.id || 
              selectedNode === connection.source.id || selectedNode === connection.target.id) && (
              <path
                d={connection.path}
                fill="none"
                stroke="#06b6d4"
                strokeWidth="4"
                opacity="0.9"
                filter="url(#nodeGlow)"
                className="animate-pulse"
              />
            )}
          </g>
        ))}

        {/* Network nodes */}
        {showNodes && allNodes.map((node) => {
          const [x, y] = node.projectedCoords;
          const isHovered = hoveredNode === node.id;
          const isSelected = selectedNode === node.id;
          const nodeSize = node.type === 'hub' ? 10 : node.type === 'major' ? 7 : 5;
          
          return (
            <g key={node.id}>
              <circle
                cx={x}
                cy={y}
                r={nodeSize}
                fill={isHovered || isSelected ? '#facc15' : node.regionColor}
                stroke={isSelected ? '#f59e0b' : isHovered ? '#facc15' : '#e2e8f0'}
                strokeWidth={isSelected ? 4 : isHovered ? 3 : 2}
                filter={(isHovered || isSelected) ? 'url(#nodeGlow)' : undefined}
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => handleNodeClick(node)}
              />
              
              {node.type === 'hub' && (
                <circle
                  cx={x}
                  cy={y}
                  r={nodeSize + 6}
                  fill="none"
                  stroke={node.regionColor}
                  strokeWidth="1"
                  opacity="0.6"
                  className="animate-ping"
                />
              )}
              
              {(isHovered || isSelected) && (
                <text
                  x={x}
                  y={y - nodeSize - 12}
                  textAnchor="middle"
                  className="text-xs font-mono fill-slate-200 pointer-events-none select-none font-bold"
                  filter="url(#nodeGlow)"
                >
                  {node.name.toUpperCase()}
                </text>
              )}
            </g>
          );
        })}

        {/* Scanning effects */}
        {animateConnections && (
          <g>
            <line
              x1="0"
              y1={scanlinePosition}
              x2={width}
              y2={scanlinePosition}
              stroke="#06b6d4"
              strokeWidth="2"
              opacity="0.4"
            />
            
            <line
              x1={(animationTime * width) / 200}
              y1="0"
              x2={(animationTime * width) / 200}
              y2={height}
              stroke="#f59e0b"
              strokeWidth="1"
              opacity="0.3"
            />
            
            {/* Corner brackets */}
            <path d="M20,20 L20,40 M20,20 L40,20" stroke="#475569" strokeWidth="2" opacity="0.6" />
            <path d={`M${width-20},20 L${width-20},40 M${width-20},20 L${width-40},20`} stroke="#475569" strokeWidth="2" opacity="0.6" />
            <path d={`M20,${height-20} L20,${height-40} M20,${height-20} L40,${height-20}`} stroke="#475569" strokeWidth="2" opacity="0.6" />
            <path d={`M${width-20},${height-20} L${width-20},${height-40} M${width-20},${height-20} L${width-40},${height-20}`} stroke="#475569" strokeWidth="2" opacity="0.6" />
          </g>
        )}
      </svg>

      {/* UI Overlays */}
      <div className="absolute top-4 left-4 space-y-3 pointer-events-none">
        <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-lg px-4 py-3 font-mono text-xs text-slate-200">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-green-400 font-bold">GLOBAL NETWORK OPERATIONAL</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>ACTIVE NODES:</span>
              <span className="text-cyan-400 font-bold">{allNodes.length}</span>
            </div>
            <div className="flex justify-between">
              <span>CONNECTIONS:</span>
              <span className="text-blue-400 font-bold">{connections.length}</span>
            </div>
            <div className="flex justify-between">
              <span>REGIONS:</span>
              <span className="text-purple-400 font-bold">{regions.length}</span>
            </div>
            {selectedRegion && (
              <div className="flex justify-between border-t border-slate-600 pt-1 mt-2">
                <span>SELECTED:</span>
                <span className="text-yellow-400 font-bold">{regions.find(r => r.id === selectedRegion)?.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 pointer-events-none">
        <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-lg px-4 py-3 font-mono text-xs text-slate-200">
          <div className="text-cyan-400 font-bold mb-2">NODE CLASSIFICATION</div>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-slate-300 animate-pulse"></div>
              <span>HUB NODE ({allNodes.filter(n => n.type === 'hub').length})</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-green-500 border border-slate-300"></div>
              <span>MAJOR NODE ({allNodes.filter(n => n.type === 'major').length})</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-gray-500"></div>
              <span>MINOR NODE ({allNodes.filter(n => n.type === 'minor').length})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tactical coordinates */}
      <div className="absolute top-4 right-4 pointer-events-none">
        <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-lg px-4 py-3 font-mono text-xs text-slate-200">
          <div className="text-orange-400 font-bold mb-2">TACTICAL COORDINATES</div>
          <div className="space-y-1">
            <div>MAP: {width} × {height}</div>
            <div>SCAN: {Math.round(scanlinePosition)}</div>
            <div>TIME: {String(Math.floor(animationTime / 10)).padStart(2, '0')}:{String(animationTime % 10).padStart(1, '0')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldNetworkMap;
