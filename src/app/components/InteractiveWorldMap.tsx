import React, { useState, useMemo, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
// Note: Sphere and Graticule are not available in this version of react-simple-maps
import { worldMapData } from "./worldMapData";

interface CountryFeature {
  rsmKey: string;
  type: string;
  properties: {
    NAME: string;
    ISO_A3: string;
    CONTINENT: string;
  };
  geometry: any;
}

interface InteractiveWorldMapProps {
  selectedCountryId?: string;
  onCountryClick?: (country: CountryFeature) => void;
  className?: string;
}

const InteractiveWorldMap: React.FC<InteractiveWorldMapProps> = ({
  selectedCountryId,
  onCountryClick,
  className = ""
}) => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  // Memoize the map projection configuration
  const mapConfig = useMemo(() => ({
    projection: "geoEqualEarth" as const,
    projectionConfig: {
      scale: 140,
      center: [0, 0]
    }
  }), []);

  // Handle country interactions
  const handleCountryEnter = useCallback((geo: CountryFeature) => {
    setHoveredCountry(geo.properties.ISO_A3);
  }, []);

  const handleCountryLeave = useCallback(() => {
    setHoveredCountry(null);
  }, []);

  const handleCountryClick = useCallback((geo: CountryFeature) => {
    onCountryClick?.(geo);
  }, [onCountryClick]);

  // Memoize country styling
  const getCountryStyle = useCallback((geo: CountryFeature) => {
    const isHovered = hoveredCountry === geo.properties.ISO_A3;
    const isSelected = selectedCountryId === geo.properties.ISO_A3;
    
    return {
      default: {
        fill: isSelected ? "#3b82f6" : isHovered ? "#1e40af" : "#374151",
        stroke: isSelected ? "#60a5fa" : isHovered ? "#3b82f6" : "#4b5563",
        strokeWidth: isSelected ? 2 : isHovered ? 1.5 : 0.5,
        outline: "none",
        transition: "all 0.3s ease-in-out",
        cursor: "pointer"
      },
      hover: {
        fill: "#1e40af",
        stroke: "#3b82f6", 
        strokeWidth: 1.5,
        outline: "none"
      },
      pressed: {
        fill: "#1e3a8a",
        stroke: "#60a5fa",
        strokeWidth: 2,
        outline: "none"
      }
    };
  }, [hoveredCountry, selectedCountryId]);

  return (
    <div className={`relative w-full h-full bg-slate-900 overflow-hidden ${className}`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-slate-800 via-slate-900 to-black" />
      
      {/* Map container */}
      <div className="relative w-full h-full">
        <ComposableMap
          projectionConfig={mapConfig.projectionConfig}
          projection={mapConfig.projection}
          width={800}
          height={400}
          className="w-full h-full"
        >
          {/* Background sphere and grid lines removed due to compatibility issues */}
          
          {/* Countries */}
          <Geographies geography={worldMapData}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo: CountryFeature) => {
                const style = getCountryStyle(geo);
                const isHovered = hoveredCountry === geo.properties.ISO_A3;
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => handleCountryEnter(geo)}
                    onMouseLeave={handleCountryLeave}
                    onClick={() => handleCountryClick(geo)}
                    style={style}
                    className={`
                      transition-all duration-300 ease-in-out
                      ${isHovered ? 'drop-shadow-lg' : ''}
                    `}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>

      {/* Country info overlay */}
      {hoveredCountry && (
        <div className="absolute top-4 left-4 pointer-events-none">
          <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-lg px-4 py-3 font-mono text-xs text-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-400 font-bold">
                {worldMapData.features.find(f => f.properties.ISO_A3 === hoveredCountry)?.properties.NAME}
              </span>
            </div>
            <div className="mt-1 text-slate-400">
              {worldMapData.features.find(f => f.properties.ISO_A3 === hoveredCountry)?.properties.CONTINENT}
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 pointer-events-none">
        <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-lg px-4 py-3 font-mono text-xs text-slate-200">
          <div className="text-cyan-400 font-bold mb-2">INTERACTIVE WORLD MAP</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-600 border border-gray-500" />
              <span>Default</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-700 border border-blue-500" />
              <span>Hovered</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 border border-blue-400" />
              <span>Selected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats overlay */}
      <div className="absolute top-4 right-4 pointer-events-none">
        <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-lg px-4 py-3 font-mono text-xs text-slate-200">
          <div className="text-orange-400 font-bold mb-2">MAP STATISTICS</div>
          <div className="space-y-1">
            <div>COUNTRIES: {worldMapData.features.length}</div>
            <div>PROJECTION: Equal Earth</div>
            {selectedCountryId && (
              <div className="border-t border-slate-600 pt-1 mt-2">
                <span className="text-yellow-400">SELECTED: {selectedCountryId}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveWorldMap;
