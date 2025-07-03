import type { Metadata, Viewport } from "next";
import React from "react";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Lions of Zion - Global Information Intelligence",
  description:
    "Defend Truth. Expose Lies. Monitor the global pulse of information with cutting-edge technology and unwavering commitment to transparency.",
  keywords: ["truth", "information", "intelligence", "monitoring", "transparency", "lions", "zion"],
  authors: [{ name: "Lions of Zion" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* PayPal SDK for hosted buttons */}
        <Script 
          src="https://www.paypal.com/sdk/js?client-id=BAAgpvkmgagTCH_kxjOA8JfyQbZBrFmp4cRt3w2d0oqQA0DnMezirBosa311pZQvP24hSYQjqEolAcYF14&components=hosted-buttons&disable-funding=venmo&currency=USD" 
          strategy="lazyOnload"
        />
      </head>
      <body className="antialiased overflow-hidden h-screen w-screen m-0 p-0 bg-black">
        {children}
      </body>
    </html>
  );
}
