"use client";
import React from 'react';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="hero-container relative text-center z-10 py-12 px-4">
      {/* Logo - Hidden as per request to focus on the lion overlay */}
      <div className="mb-8 relative z-20 hidden">
        <Image
          src="/assets/images/logo.png.svg"
          alt="Lions of Zion Logo"
          width={250}
          height={250}
          className="mx-auto animate-glow drop-shadow-2xl"
          priority
        />
      </div>
      
      {/* Hero Content - With Modern Tailwind Styling */}
      <div className="relative z-20 space-y-10">
        {/* Gold Bold Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
          LIONS OF ZION
        </h1>
        
        {/* Cyan Uppercase Subtitle */}
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-[0.3em] text-cyan-300 drop-shadow-lg">
          GLOBAL NARRATIVE PULSE
        </h2>
        
        {/* Soft Blue Mission Text */}
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-blue-200 font-medium drop-shadow-md">
            Defend Truth. Expose Lies. Monitor the global pulse of information warfare.
          </p>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-cyan-200 font-semibold drop-shadow-md">
            We are the guardians standing against deception in the digital age.
          </p>
        </div>
        
        <button className="cyber-button text-lg mt-8 px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold uppercase tracking-wide rounded-lg border border-cyan-400 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          JOIN THE NETWORK
        </button>
      </div>
    </div>
  );
}
