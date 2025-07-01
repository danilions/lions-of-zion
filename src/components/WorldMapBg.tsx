'use client';
import React from 'react';
import Image from 'next/image';

export default function WorldMapBg() {
  return (
    <>
      <div className="absolute left-1/2 top-[180px] -translate-x-1/2 w-[900px] max-w-[97vw] h-[400px] opacity-60 pointer-events-none z-0 animate-pulse-map drop-shadow-lg filter-brightness">
        <Image
          src="https://www.pngall.com/wp-content/uploads/1/World-Map-PNG-Image-File.png"
          alt="World Map"
          width={900}
          height={400}
          className="w-full h-full object-contain filter-darken"
          style={{ filter: 'drop-shadow(0 0 20px #0ca3ff) drop-shadow(0 0 10px #1b2a49)' }}
          priority={true}
        />
      </div>

      {/* Animated Lion SVG overlay top-right corner */}
      <svg
        className="absolute top-4 right-6 w-32 h-32 opacity-80 animate-lion-breathe pointer-events-none"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M32 4C22 12 16 24 16 24s-4 11-4 20c0 9 4 16 4 16s2-8 4-12c2-4 8-8 8-8s6 4 8 8c2 4 4 12 4 12s4-7 4-16c0-9-4-20-4-20s-6-12-16-20z"
          fill="#FFD700"
          stroke="#FFA500"
          strokeWidth="1"
        />
      </svg>

      <style jsx>{`
        @keyframes pulse-map {
          0%, 100% { filter: brightness(0.6) drop-shadow(0 0 20px #0ca3ff) drop-shadow(0 0 10px #1b2a49); }
          50% { filter: brightness(0.8) drop-shadow(0 0 30px #2fb4ff) drop-shadow(0 0 15px #2a3a66); }
        }
        .animate-pulse-map {
          animation: pulse-map 6s ease-in-out infinite;
        }

        @keyframes lion-breathe {
          0%, 100% { opacity: 0.8; transform: scale(1) translateY(0); }
          50% { opacity: 1; transform: scale(1.05) translateY(-3px); }
        }
        .animate-lion-breathe {
          animation: lion-breathe 4s ease-in-out infinite;
        }

        .filter-brightness {
          filter: brightness(0.6) contrast(1.2) saturate(0.9);
        }

        .filter-darken {
          filter: brightness(0.5) contrast(1.3) saturate(0.8);
        }
      `}</style>
    </>
  );
}