"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// Import directly from the confirmed working path
import WorldNetworkMap from "../components/WorldNetworkMap";

/**
 * Home page component that displays the WorldNetworkMap full screen
 * with proper z-index layering to allow content to be placed on top
 */
export default function Home() {
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
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-black text-white">
      {/* Map layer - full viewport coverage */}
      <div className="absolute inset-0 z-0">
        <WorldNetworkMap nodes={[]} connections={[]} />
      </div>

      {/* Top-left logo - always visible */}
      <div className="absolute top-4 left-4 z-50">
        <Image 
          src="/assets/images/logo.png.svg" 
          alt="Lions of Zion Logo" 
          width={160} 
          height={60} 
          className="w-40 h-auto"
          priority
        />
      </div>

      {/* Bottom-left donation buttons - visible on md screens and up */}
      <div className="absolute bottom-6 left-6 z-50 flex-col gap-4 hidden md:flex">
        {/* PayPal Button */}
        <div id="paypal-container-Q3K75XGZZ3LFS" ref={paypalContainerRef} className="min-h-[35px]"></div>

        {/* BuyMeACoffee Button */}
        <Link
          href="https://buymeacoffee.com/danielhanukayeb"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded text-center mt-2"
        >
          Buy Me A Coffee
        </Link>
      </div>
    </div>
  );
}