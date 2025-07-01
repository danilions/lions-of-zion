"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import logoImage from '../../public/assets/images/logo.svg';

export default function LionOverlay() {
  const [animationActive, setAnimationActive] = useState(false);
  
  // Trigger the initial animation after component mounts
  useEffect(() => {
    // Small delay to ensure animation runs after page load
    const timer = setTimeout(() => {
      setAnimationActive(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
      {/* Main Lion Emblem with Enhanced Breathing Animation */}
      <div 
        className={`absolute top-8 right-8 w-40 h-40 rounded-full bg-gradient-to-br from-yellow-500 via-amber-400 to-yellow-600 shadow-2xl flex items-center justify-center transform transition-all duration-1000 ${
          animationActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
        style={{ 
          filter: 'drop-shadow(0 0 30px #FFD700) drop-shadow(0 0 60px #FFA500) drop-shadow(0 0 90px rgba(255, 215, 0, 0.4))',
          animation: 'lion-breathe 4s ease-in-out infinite'
        }}
      >
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 flex items-center justify-center animate-pulse" style={{ animationDelay: '0.5s', filter: 'blur(5px)' }}>
            <Image 
              src={logoImage} 
              alt="Lions of Zion Logo" 
              fill
              style={{ objectFit: 'contain' }}
              className="opacity-70"
              priority
            />
          </div>
          <div className="relative w-full h-full">
            <Image 
              src={logoImage} 
              alt="Lions of Zion Logo" 
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>
      </div>
      
      {/* Enhanced Decorative Corner Lines with Glow */}
      <div className={`absolute top-5 right-5 w-10 h-10 transition-all duration-700 ${animationActive ? 'opacity-70' : 'opacity-0'}`} style={{ transitionDelay: '400ms' }}>
        <div className="absolute top-2 right-2 w-8 h-0.5 bg-cyan-400" style={{ boxShadow: '0 0 10px #00FFFF' }}></div>
        <div className="absolute top-2 right-2 w-0.5 h-8 bg-cyan-400" style={{ boxShadow: '0 0 10px #00FFFF' }}></div>
      </div>
      
      <div className={`absolute top-5 left-5 w-10 h-10 transition-all duration-700 ${animationActive ? 'opacity-70' : 'opacity-0'}`} style={{ transitionDelay: '500ms' }}>
        <div className="absolute top-2 left-2 w-8 h-0.5 bg-cyan-400" style={{ boxShadow: '0 0 10px #00FFFF' }}></div>
        <div className="absolute top-2 left-2 w-0.5 h-8 bg-cyan-400" style={{ boxShadow: '0 0 10px #00FFFF' }}></div>
      </div>
      
      <div className={`absolute bottom-5 right-5 w-10 h-10 transition-all duration-700 ${animationActive ? 'opacity-70' : 'opacity-0'}`} style={{ transitionDelay: '600ms' }}>
        <div className="absolute bottom-2 right-2 w-8 h-0.5 bg-cyan-400" style={{ boxShadow: '0 0 10px #00FFFF' }}></div>
        <div className="absolute bottom-2 right-2 w-0.5 h-8 bg-cyan-400" style={{ boxShadow: '0 0 10px #00FFFF' }}></div>
      </div>
      
      <div className={`absolute bottom-5 left-5 w-10 h-10 transition-all duration-700 ${animationActive ? 'opacity-70' : 'opacity-0'}`} style={{ transitionDelay: '700ms' }}>
        <div className="absolute bottom-2 left-2 w-8 h-0.5 bg-cyan-400" style={{ boxShadow: '0 0 10px #00FFFF' }}></div>
        <div className="absolute bottom-2 left-2 w-0.5 h-8 bg-cyan-400" style={{ boxShadow: '0 0 10px #00FFFF' }}></div>
      </div>
      
      {/* Additional Cyber Elements */}
      <div className={`absolute top-1/3 left-8 w-3 h-20 transition-all duration-700 ${animationActive ? 'opacity-50' : 'opacity-0'}`} style={{ transitionDelay: '800ms' }}>
        <div className="w-full h-full bg-gradient-to-b from-cyan-400 to-transparent animate-pulse"></div>
      </div>
      
      <div className={`absolute top-1/3 right-8 w-3 h-20 transition-all duration-700 ${animationActive ? 'opacity-50' : 'opacity-0'}`} style={{ transitionDelay: '900ms' }}>
        <div className="w-full h-full bg-gradient-to-b from-cyan-400 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      {/* Animated Scanning Lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/20 animate-[scanline_4s_linear_infinite]"></div>
      </div>
      
      <style jsx>{`
        @keyframes lion-breathe {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.9;
            filter: drop-shadow(0 0 30px #FFD700) drop-shadow(0 0 60px #FFA500);
          }
          50% {
            transform: scale(1.05) rotate(1deg);
            opacity: 1;
            filter: drop-shadow(0 0 40px #FFD700) drop-shadow(0 0 80px #FFA500);
          }
        }
        
        @keyframes scanline {
          0% { transform: translateY(0); opacity: 0; }
          5% { opacity: 0.5; }
          95% { opacity: 0.5; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
