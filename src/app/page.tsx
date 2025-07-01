import React from 'react'
import UnifiedNetworkCanvas from '@/components/UnifiedNetworkCanvas'
import LionOverlay from '@/components/LionOverlay'
import Hero from '@/components/ui/Hero'
import Skyline from '@/components/Skyline'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#0A0E1A] via-[#091f3b] to-[#254875] overflow-hidden">
      {/* Unified Network Canvas Background - Full Coverage, HiDPI-ready */}
      <UnifiedNetworkCanvas />
      
      {/* Lion Overlay - Top Right Corner with breathing animation and drop shadows */}
      <LionOverlay />
      
      {/* Main Content Container - Centered vertically and horizontally */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen max-h-screen px-4 sm:px-6 lg:px-8">
        <Hero />
      </div>

      {/* Jerusalem Skyline Background - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 w-full h-32 opacity-80 pointer-events-none z-5">
        <Skyline />
      </div>
    </main>
  )
}