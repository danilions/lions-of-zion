import React from 'react';

export default function Skyline() {
  return (
    <div className="w-full h-full">
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 -5px 15px rgba(0, 174, 239, 0.3))' }}
      >
        <defs>
          <linearGradient id="skyline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 174, 239, 0.7)" />
            <stop offset="50%" stopColor="rgba(77, 200, 240, 0.5)" />
            <stop offset="100%" stopColor="rgba(0, 174, 239, 0.2)" />
          </linearGradient>
          
          <filter id="skyline-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Jerusalem-inspired Skyline Silhouette with enhanced glow */}
        <path
          d="M0,120 L0,80 L50,80 L50,45 L80,45 L80,35 L110,35 L110,25 L140,25 L140,50 L170,50 L170,30 L200,30 L200,60 L230,60 L230,40 L260,40 L260,20 L290,20 L290,55 L320,55 L320,35 L350,35 L350,15 L380,15 L380,45 L410,45 L410,25 L440,25 L440,65 L470,65 L470,45 L500,45 L500,25 L530,25 L530,50 L560,50 L560,30 L590,30 L590,10 L620,10 L620,40 L650,40 L650,20 L680,20 L680,55 L710,55 L710,35 L740,35 L740,15 L770,15 L770,45 L800,45 L800,25 L830,25 L830,60 L860,60 L860,40 L890,40 L890,20 L920,20 L920,50 L950,50 L950,30 L980,30 L980,70 L1010,70 L1010,50 L1040,50 L1040,30 L1070,30 L1070,45 L1100,45 L1100,25 L1130,25 L1130,55 L1160,55 L1160,35 L1200,35 L1200,120 Z"
          fill="url(#skyline-gradient)"
          stroke="rgba(0, 174, 239, 0.4)"
          strokeWidth="1"
          filter="url(#skyline-glow)"
        />
        
        {/* Enhanced Dome Structures (representing religious buildings) with better glow */}
        <ellipse cx="200" cy="30" rx="15" ry="10" fill="url(#skyline-gradient)" opacity="0.9" filter="url(#skyline-glow)" />
        <ellipse cx="400" cy="15" rx="12" ry="8" fill="url(#skyline-gradient)" opacity="0.9" filter="url(#skyline-glow)" />
        <ellipse cx="600" cy="10" rx="18" ry="12" fill="url(#skyline-gradient)" opacity="0.9" filter="url(#skyline-glow)" />
        <ellipse cx="800" cy="25" rx="14" ry="9" fill="url(#skyline-gradient)" opacity="0.9" filter="url(#skyline-glow)" />
        
        {/* Additional Highlight Details */}
        <path
          d="M590,10 L590,0 L620,0 L620,10"
          stroke="rgba(77, 200, 240, 0.8)"
          strokeWidth="1"
          fill="none"
          filter="url(#skyline-glow)"
        />
        
        <path
          d="M350,15 L350,5 L380,5 L380,15"
          stroke="rgba(77, 200, 240, 0.8)"
          strokeWidth="1"
          fill="none"
          filter="url(#skyline-glow)"
        />
      </svg>
    </div>
  );
}
