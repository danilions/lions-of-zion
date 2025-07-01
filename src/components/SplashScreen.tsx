"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logoImage from '../../public/assets/images/logo.png.svg';

interface SplashScreenProps {
  duration?: number;
  onComplete?: () => void;
}

export default function SplashScreen({ duration = 3000, onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 animate-fadeIn">
      <div className="relative w-64 h-64 md:w-80 md:h-80 animate-pulse">
        {/* Main logo image */}
        <Image
          src={logoImage}
          alt="Lions of Zion Splash Screen"
          fill
          priority
          style={{ objectFit: 'contain' }}
        />
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 opacity-30 blur-2xl -z-10"></div>
      </div>
      
      {/* Loading indicator */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-center">
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-[loading_3s_ease-in-out]"></div>
        </div>
      </div>
      
      {/* Additional text */}
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <p className="text-cyan-300 font-semibold tracking-widest animate-pulse">
          INITIALIZING
        </p>
      </div>
      
      {/* Custom animation */}
      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
