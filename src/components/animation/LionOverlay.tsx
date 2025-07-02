"use client";
import React from "react";

export default function LionOverlay() {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-30">
      {/* Animated geometric overlay */}
      <div className="absolute top-10 right-10 w-16 h-16 border-2 border-cyan-400 opacity-30 animate-pulse">
        <div className="w-full h-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20"></div>
      </div>

      <div className="absolute bottom-20 left-10 w-12 h-12 border border-blue-400 opacity-25 animate-float">
        <div className="w-full h-full bg-gradient-to-tr from-blue-400/20 to-cyan-400/20"></div>
      </div>

      {/* Corner accent lines */}
      <div className="absolute top-0 left-0 w-20 h-20">
        <div className="absolute top-4 left-4 w-12 h-0.5 bg-cyan-400 opacity-50"></div>
        <div className="absolute top-4 left-4 w-0.5 h-12 bg-cyan-400 opacity-50"></div>
      </div>

      <div className="absolute top-0 right-0 w-20 h-20">
        <div className="absolute top-4 right-4 w-12 h-0.5 bg-cyan-400 opacity-50"></div>
        <div className="absolute top-4 right-4 w-0.5 h-12 bg-cyan-400 opacity-50"></div>
      </div>
    </div>
  );
}
