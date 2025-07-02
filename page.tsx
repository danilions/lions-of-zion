"use client";
import React from "react";
import Hero from "@/components/Hero";
import NetworkMapCanvas from "@/components/NetworkMapCanvas";
import HeartbeatLine from "@/components/HeartbeatLine";
import Skyline from "@/components/Skyline";
import LionOverlay from "@/components/LionOverlay";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-primary-gradient overflow-hidden">
      {/* Lion Overlay - Top layer with new styling */}
      <LionOverlay />

      {/* Network Map Canvas - Background animation layer */}
      <div className="absolute inset-0 z-0">
        <NetworkMapCanvas />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Hero Section */}
        <section className="text-center max-w-6xl mx-auto pt-16 pb-12">
          <Hero />
        </section>

        {/* Decorative Cyber Pedestal */}
        <div className="cyber-card w-80 h-16 mb-12 flex items-center justify-center">
          <div className="w-full h-2 bg-button-gradient rounded-full animate-pulse-neon"></div>
        </div>

        {/* System Monitor - Heartbeat */}
        <section className="w-full max-w-4xl mb-16">
          <div className="cyber-card">
            <h3 className="text-subtitle text-lg mb-4 text-center">
              SYSTEM PULSE MONITOR
            </h3>
            <div className="h-16 w-full">
              <HeartbeatLine />
            </div>
          </div>
        </section>

        {/* Live Status Notifications */}
        <section className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col sm:flex-row gap-4 px-4">
            <div className="notification info">
              <span className="text-sm">79 GUARDIANS ACTIVE</span>
            </div>
            <div className="notification warning">
              <span className="text-sm">THREAT VECTOR DETECTED</span>
            </div>
          </div>
        </section>
      </div>

      {/* Background Skyline - Subtle */}
      <div className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none z-0">
        <Skyline />
      </div>
    </main>
  );
}
