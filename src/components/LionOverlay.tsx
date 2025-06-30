import React from 'react';

export default function LionOverlay() {
  return (
    <>
      <div className="absolute top-10 right-10 w-40 h-40 opacity-80 animate-lion-breathe pointer-events-none z-10">
        <img
          src="/lion.png"
          alt="Lion Overlay"
          className="w-full h-full object-contain"
          style={{ filter: 'drop-shadow(0 0 8px #ffd700)' }}
        />
      </div>

      <style jsx>{`
        @keyframes lion-breathe {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1) translateY(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) translateY(-3px);
          }
        }
        .animate-lion-breathe {
          animation: lion-breathe 4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
