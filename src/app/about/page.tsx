"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import WorldNetworkMap from "@/components/WorldNetworkMap";

/**
 * About page component that displays the WorldNetworkMap as a background
 * with content layered on top, including the PayPal and BuyMeACoffee buttons
 */
export default function AboutPage() {
  const paypalContainerRef = useRef<HTMLDivElement>(null);

  // Effect to render the PayPal button
  useEffect(() => {
    if (typeof window !== "undefined" && window.paypal && paypalContainerRef.current) {
      try {
        window.paypal.HostedButtons({
          hostedButtonId: "Q3K75XGZZ3LFS"
        }).render("#paypal-container-Q3K75XGZZ3LFS");
      } catch (error) {
        console.error("Failed to render PayPal button:", error);
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Background Map */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <WorldNetworkMap nodes={[]} connections={[]} />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">About Lions of Zion</h1>
        
        <div className="prose prose-invert max-w-3xl">
          <p className="text-lg mb-6">
            We are a global network dedicated to defending truth and exposing misinformation 
            through cutting-edge technology and unwavering commitment to transparency.
          </p>

          {/* Support Section */}
          <div className="mt-12 flex flex-col gap-4 md:flex-row items-center">
            {/* PayPal donation button */}
            <div id="paypal-container-Q3K75XGZZ3LFS" ref={paypalContainerRef} className="min-h-[35px]" />
            
            {/* BuyMeACoffee button */}
            <Link 
              href="https://buymeacoffee.com/danielhanukayeb" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded text-center"
            >
              Support Our Mission
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}