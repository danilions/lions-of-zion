import type { Metadata, Viewport } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lions of Zion - Global Narrative Pulse",
  description: "Defend Truth. Expose Lies. Monitor the global pulse of information.",
  keywords: ["truth", "information", "narrative", "lions", "zion", "pulse"],
  authors: [{ name: "Lions of Zion" }],
  icons: {
    icon: "/assets/images/logo.png.svg",
    apple: "/assets/images/logo.png.svg",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
