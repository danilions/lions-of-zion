"use client";
import React, { useState, useEffect } from 'react';

export default function Hero() {
  const [animateElements, setAnimateElements] = useState({
    title: false,
    subtitle: false,
    mission: false,
    button: false
  });
  
  useEffect(() => {
    // Sequential animation of elements
    const timers = [
      setTimeout(() => setAnimateElements(prev => ({ ...prev, title: true })), 800),
      setTimeout(() => setAnimateElements(prev => ({ ...prev, subtitle: true })), 1400),
      setTimeout(() => setAnimateElements(prev => ({ ...prev, mission: true })), 2000),
      setTimeout(() => setAnimateElements(prev => ({ ...prev, button: true })), 2600)
    ];
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <div className="hero-container relative text-center z-10 py-12 px-4">
      {/* Hero Content - With Modern Tailwind Styling and Sequenced Animations */}
      <div className="relative z-20 space-y-10">
        {/* Gold Bold Title with Enhanced Animation */}
        <h1 
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent drop-shadow-2xl transform transition-all duration-1000 ${
            animateElements.title ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          LIONS OF ZION
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 opacity-20 blur-xl animate-pulse hidden sm:block"></div>
        </h1>
        
        {/* Cyan Uppercase Subtitle with Enhanced Animation */}
        <h2 
          className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-[0.3em] text-cyan-300 drop-shadow-lg transform transition-all duration-1000 ${
            animateElements.subtitle ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <span className="relative">
            <span className="absolute top-0 left-0 w-full h-full bg-cyan-400/10 blur-md animate-pulse"></span>
            GLOBAL NARRATIVE PULSE
          </span>
        </h2>
        
        {/* Soft Blue Mission Text with Enhanced Animation */}
        <div 
          className={`max-w-4xl mx-auto space-y-6 transform transition-all duration-1000 ${
            animateElements.mission ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-blue-200 font-medium drop-shadow-md">
            Defend Truth. Expose Lies. Monitor the global pulse of information warfare.
          </p>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-cyan-200 font-semibold drop-shadow-md">
            We are the guardians standing against deception in the digital age.
          </p>
        </div>
        
        {/* Enhanced Cyber Button with Animation */}
        <button 
          className={`cyber-button group relative overflow-hidden text-lg mt-8 px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold uppercase tracking-wide rounded-lg border border-cyan-400 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${
            animateElements.button ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="relative z-20">JOIN THE NETWORK</span>
          <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></span>
          <span className="absolute -inset-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20 blur-sm animate-pulse z-0"></span>
        </button>
      </div>
      
      {/* Scanner Effect */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-[scanline_8s_linear_infinite_alternate]"></div>
    </div>
  );
}
