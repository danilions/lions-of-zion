import React from 'react';

export const DigitalLion: React.FC = () => {
  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-200 to-secondary-200 opacity-20 animate-pulse"></div>
      
      {/* Middle ring */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-r from-primary-300 to-secondary-300 opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      
      {/* Inner core */}
      <div className="absolute inset-8 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 flex items-center justify-center">
        
        {/* Lion SVG Symbol */}
        <svg 
          className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 text-primary-600" 
          viewBox="0 0 200 200" 
          fill="currentColor"
        >
          {/* Lion head silhouette */}
          <circle cx="100" cy="100" r="60" opacity="0.8" />
          
          {/* Mane elements */}
          <circle cx="70" cy="70" r="20" opacity="0.6" />
          <circle cx="130" cy="70" r="20" opacity="0.6" />
          <circle cx="50" cy="100" r="15" opacity="0.5" />
          <circle cx="150" cy="100" r="15" opacity="0.5" />
          <circle cx="70" cy="130" r="18" opacity="0.6" />
          <circle cx="130" cy="130" r="18" opacity="0.6" />
          
          {/* Eyes */}
          <circle cx="85" cy="90" r="4" fill="white" />
          <circle cx="115" cy="90" r="4" fill="white" />
          <circle cx="85" cy="90" r="2" fill="currentColor" />
          <circle cx="115" cy="90" r="2" fill="currentColor" />
          
          {/* Digital elements */}
          <rect x="75" y="110" width="2" height="8" opacity="0.8" />
          <rect x="80" y="108" width="2" height="12" opacity="0.6" />
          <rect x="85" y="112" width="2" height="6" opacity="0.8" />
          <rect x="90" y="106" width="2" height="14" opacity="0.7" />
          <rect x="95" y="110" width="2" height="8" opacity="0.8" />
          <rect x="100" y="104" width="2" height="16" opacity="0.9" />
          <rect x="105" y="110" width="2" height="8" opacity="0.8" />
          <rect x="110" y="106" width="2" height="14" opacity="0.7" />
          <rect x="115" y="112" width="2" height="6" opacity="0.8" />
          <rect x="120" y="108" width="2" height="12" opacity="0.6" />
          <rect x="125" y="110" width="2" height="8" opacity="0.8" />
        </svg>
        
        {/* Scanning lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-px h-full bg-gradient-to-b from-transparent via-primary-400 to-transparent opacity-60 animate-pulse"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-secondary-400 to-transparent opacity-60 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
        </div>
      </div>
      
      {/* Floating data particles */}
      <div className="absolute top-4 right-8 w-1 h-1 bg-primary-500 rounded-full animate-ping"></div>
      <div className="absolute bottom-8 left-4 w-1 h-1 bg-secondary-500 rounded-full animate-ping" style={{ animationDelay: '0.7s' }}></div>
      <div className="absolute top-1/3 left-2 w-1 h-1 bg-primary-500 rounded-full animate-ping" style={{ animationDelay: '1.2s' }}></div>
      <div className="absolute bottom-1/3 right-2 w-1 h-1 bg-secondary-500 rounded-full animate-ping" style={{ animationDelay: '1.8s' }}></div>
    </div>
  );
};
