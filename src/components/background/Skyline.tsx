'use client'

import React from 'react';

export default function Skyline() {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 1200 120"
      preserveAspectRatio="xMidYMax slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ 
        filter: 'drop-shadow(0 -5px 15px rgba(0, 174, 239, 0.3))',
        position: 'relative',
        zIndex: 5
      }}
    >
      <path
        d="M0 200h50V120h30V80h40V60h50V40h60V100h70V60h80V120h90V80h100V140h110V100h120V180h130V120h140V200Z"
        fill="url(#skyline-gradient)"
      />
      <defs>
        <linearGradient id="skyline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(0, 174, 239, 0.3)" />
          <stop offset="100%" stopColor="rgba(0, 174, 239, 0.1)" />
        </linearGradient>
      </defs>
    </svg>
  )
}
