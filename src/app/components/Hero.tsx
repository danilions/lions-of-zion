"use client";
import React from "react";

export default function Hero() {
  return (
    <div className="text-center space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Main Heading */}
      <h1 className="text-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl animate-pulse-neon">
        LIONS OF ZION
      </h1>

      {/* Subtitle */}
      <h2 className="text-subtitle text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide">
        GLOBAL NARRATIVE PULSE – DEFEND TRUTH. EXPOSE LIES.
      </h2>

      {/* Mission Statement */}
      <div className="max-w-3xl mx-auto pt-4">
        <p className="text-body text-base sm:text-lg md:text-xl leading-relaxed font-medium">
          We are the guardians of truth in an age of deception. Our mission is
          to cut through the noise, expose the lies that divide us, and defend
          the authentic narratives that unite humanity. Join us as we monitor
          the global pulse of information and stand as lions against the forces
          of misinformation.
        </p>
      </div>
    </div>
  );
}
