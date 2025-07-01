"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

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
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <Image
        src="/backgrounds/hero-background.svg"
        alt="Hero background"
        fill
        priority
        className="object-cover object-center z-0"
        sizes="100vw"
      />
      {/* Hero Content - With Modern Tailwind Styling and Sequenced Animations */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        {/* Gold Bold Title with Enhanced Animation */}
        <h1 
          className={`text-5xl md:text-7xl font-bold text-white drop-shadow-lg mb-6 transform transition-all duration-1000 ${
            animateElements.title ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          LIONS OF ZION
        </h1>
        
        {/* Cyan Uppercase Subtitle with Enhanced Animation */}
        <h2 
          className={`text-xl md:text-2xl text-white/90 max-w-2xl mb-8 transform transition-all duration-1000 ${
            animateElements.subtitle ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          Uniting visionaries, builders, and dreamers across the globe.
        </h2>
        
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
    </section>
  );
}
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
