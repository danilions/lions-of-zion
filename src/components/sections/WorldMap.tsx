import React from 'react';

export const WorldMap: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full max-w-4xl aspect-[2/1] opacity-60">
        {/* Animated connection lines */}
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 800 400"
          fill="none"
        >
          {/* World map outline - simplified */}
          <path
            d="M50 150 Q100 130 150 140 T250 150 Q300 140 350 150 T450 160 Q500 150 550 160 T650 170 Q700 160 750 170"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary-300"
            fill="none"
          />
          
          {/* Connection points with pulse animation */}
          <g className="animate-pulse">
            <circle cx="100" cy="140" r="3" fill="currentColor" className="text-primary-500" />
            <circle cx="200" cy="145" r="3" fill="currentColor" className="text-secondary-500" />
            <circle cx="300" cy="150" r="3" fill="currentColor" className="text-primary-500" />
            <circle cx="400" cy="155" r="3" fill="currentColor" className="text-secondary-500" />
            <circle cx="500" cy="160" r="3" fill="currentColor" className="text-primary-500" />
            <circle cx="600" cy="165" r="3" fill="currentColor" className="text-secondary-500" />
          </g>
          
          {/* Data flow lines */}
          <g className="opacity-40">
            <line x1="100" y1="140" x2="200" y2="145" stroke="currentColor" strokeWidth="0.5" className="text-primary-400" />
            <line x1="200" y1="145" x2="300" y2="150" stroke="currentColor" strokeWidth="0.5" className="text-primary-400" />
            <line x1="300" y1="150" x2="400" y2="155" stroke="currentColor" strokeWidth="0.5" className="text-primary-400" />
            <line x1="400" y1="155" x2="500" y2="160" stroke="currentColor" strokeWidth="0.5" className="text-primary-400" />
            <line x1="500" y1="160" x2="600" y2="165" stroke="currentColor" strokeWidth="0.5" className="text-primary-400" />
          </g>
        </svg>
        
        {/* Floating data indicators */}
        <div className="absolute top-8 left-16 animate-bounce-subtle">
          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
        </div>
        <div className="absolute top-12 right-20 animate-bounce-subtle" style={{ animationDelay: '0.5s' }}>
          <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
        </div>
        <div className="absolute bottom-16 left-1/3 animate-bounce-subtle" style={{ animationDelay: '1s' }}>
          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
        </div>
        <div className="absolute bottom-12 right-1/3 animate-bounce-subtle" style={{ animationDelay: '1.5s' }}>
          <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
