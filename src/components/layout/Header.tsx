import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="font-display text-xl font-bold text-neutral-900">
            Lions of Zion
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
            About
          </Link>
          <Link href="/services" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
            Services
          </Link>
          <Link href="/contact" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button size="sm">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};
