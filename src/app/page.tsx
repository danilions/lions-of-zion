"use client";
import React, { useState, useEffect } from 'react';
import Hero from "@/components/ui/Hero";
import Skyline from "@/components/Skyline";
import SplashScreen from "@/components/SplashScreen";
import LionOverlay from "@/components/LionOverlay";
import UnifiedNetworkCanvas from "@/components/UnifiedNetworkCanvas";

export default function Home() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  
  useEffect(() => {
    // Mark page as loaded after a brief delay to allow animations to sequence properly
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <main className="relative min-h-screen w-full bg-black">
      {/* Splash Screen - Will automatically hide after duration */}
      {showSplash && <SplashScreen duration={3500} onComplete={() => setShowSplash(false)} />}
      
      {/* Unified Network Canvas Background - Full Coverage, HiDPI-ready */}
      <UnifiedNetworkCanvas />
      
      {/* Lion Overlay - With enhanced breathing animation and cyber elements */}
      <LionOverlay />
      
      {/* Main Content Container - Centered vertically and horizontally */}
      <div className={`relative z-10 flex flex-col items-center justify-center min-h-screen max-h-screen px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Hero />
      </div>

      {/* Jerusalem Skyline Background - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 w-full h-32 opacity-80 pointer-events-none z-5">
        <Skyline />
      </div>
    </main>
  );
}