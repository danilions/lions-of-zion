import React from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { WorldMap } from './WorldMap';
import { DigitalLion } from './DigitalLion';
import { MetricsDisplay } from './MetricsDisplay';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-primary-50/30"></div>
      
      {/* Animated World Map Background */}
      <div className="absolute inset-0 opacity-10">
        <WorldMap />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center w-full">
            
            {/* Left Content */}
            <div className="space-y-8 lg:space-y-10">
              {/* Status Badge */}
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse"></div>
                <Badge variant="secondary" size="lg" className="font-medium">
                  Live Monitoring Active
                </Badge>
              </div>
              
              {/* Main Headline */}
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-neutral-900 leading-tight tracking-tight">
                  Defend
                  <span className="block text-primary-600">Truth.</span>
                  <span className="block">Expose Lies.</span>
                </h1>
                
                <p className="text-xl sm:text-2xl text-neutral-600 leading-relaxed max-w-2xl">
                  AI-powered intelligence platform detecting misinformation in real-time across global networks
                </p>
              </div>
              
              {/* Key Features */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  </div>
                  <span className="text-neutral-700 font-medium">Real-time Detection</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-secondary-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-secondary-600 rounded-full"></div>
                  </div>
                  <span className="text-neutral-700 font-medium">Global Coverage</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  </div>
                  <span className="text-neutral-700 font-medium">AI-Driven Analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-secondary-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-secondary-600 rounded-full"></div>
                  </div>
                  <span className="text-neutral-700 font-medium">Instant Alerts</span>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="px-8 py-4 text-lg font-semibold shadow-medium hover:shadow-hard transition-all duration-300">
                  Start Monitoring
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold border-2">
                  View Demo
                </Button>
              </div>
            </div>
            
            {/* Right Visual */}
            <div className="relative lg:h-[600px] flex items-center justify-center">
              {/* Digital Lion Symbol */}
              <div className="relative">
                <DigitalLion />
                
                {/* Floating Metrics */}
                <div className="absolute -top-8 -left-8 lg:-left-16">
                  <MetricsDisplay 
                    label="Threats Detected"
                    value="47,382"
                    trend="+12%"
                    type="success"
                  />
                </div>
                
                <div className="absolute -bottom-4 -right-8 lg:-right-16">
                  <MetricsDisplay 
                    label="Sources Monitored"
                    value="15,926"
                    trend="+8%"
                    type="info"
                  />
                </div>
                
                <div className="absolute top-1/2 -right-4 lg:-right-12 transform -translate-y-1/2">
                  <MetricsDisplay 
                    label="Accuracy Rate"
                    value="99.7%"
                    trend="stable"
                    type="primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};
