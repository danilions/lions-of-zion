import type { Metadata, Viewport } from "next";
import React from "react";
import "./globals.css";

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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
