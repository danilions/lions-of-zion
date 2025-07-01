"use client";
import React from 'react';

export default function LionOverlay() {
  return (
    <div className="fixed top-8 right-8 w-40 h-40 z-50 pointer-events-none">
      {/* Lion Icon with Enhanced Breathing Animation */}
      <div 
        className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 via-amber-300 to-yellow-600 shadow-2xl flex items-center justify-center"
        style={{ 
          filter: 'drop-shadow(0 0 30px #FFD700) drop-shadow(0 0 60px #FFA500) drop-shadow(0 0 90px rgba(255, 215, 0, 0.4))',
          animation: 'lion-breathe 4s ease-in-out infinite'
        }}
      >
        <div className="text-6xl">
          🦁
        </div>
      </div>
      
      {/* Enhanced Decorative Corner Lines with Glow */}
      <div className="absolute -top-3 -left-3 w-10 h-10">
        <div className="absolute top-2 left-2 w-8 h-0.5 bg-cyan-400 opacity-70" style={{ boxShadow: '0 0 10px #00FFFF' }}></div>
        <div className="absolute top-2 left-2 w-0.5 h-8 bg-cyan-400 opacity-70" style={{ boxShadow: '0 0 10px #00FFFF' }}></div>
      </div>
      
      <div className="absolute -top-3 -right-3 w-10 h-10">
        <div className="absolute top-2 right-2 w-8 h-0.5 bg-cyan-400 opacity-70" style={{ boxShadow: '0 0 10px #00FFFF' }}></div>
        <div className="absolute top-2 right-2 w-0.5 h-8 bg-cyan-400 opacity-70" style={{ boxShadow: '0 0 10px #00FFFF' }}></div>
      </div>
      
      <div className="absolute -bottom-3 -left-3 w-10 h-10">
        <div className="absolute bottom-2 left-2 w-8 h-0.5 bg-cyan-400 opacity-70" style={{ boxShadow: '0 0 10px #00FFFF' }}></div>
        <div className="absolute bottom-2 left-2 w-0.5 h-8 bg-cyan-400 opacity-70" style={{ boxShadow: '0 0 10px #00FFFF' }}></div>
      </div>
      
      <div className="absolute -bottom-3 -right-3 w-10 h-10">
        <div className="absolute bottom-2 right-2 w-8 h-0.5 bg-cyan-400 opacity-70" style={{ boxShadow: '0 0 10px #00FFFF' }}></div>
        <div className="absolute bottom-2 right-2 w-0.5 h-8 bg-cyan-400 opacity-70" style={{ boxShadow: '0 0 10px #00FFFF' }}></div>
      </div>
      
      <style jsx>{`
        @keyframes lion-breathe {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.9;
            filter: drop-shadow(0 0 30px #FFD700) drop-shadow(0 0 60px #FFA500);
          }
          50% {
            transform: scale(1.15) rotate(2deg);
            opacity: 1;
            filter: drop-shadow(0 0 40px #FFD700) drop-shadow(0 0 80px #FFA500);
          }
        }
      `}</style>
    </div>
  );
}
