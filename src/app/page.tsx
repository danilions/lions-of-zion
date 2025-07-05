'use client';

import { useState } from 'react';
import WorldNetworkMap from "@/components/WorldNetworkMap";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<ContactFormData>>({});

  const validateForm = (): boolean => {
    const errors: Partial<ContactFormData> = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) errors.message = 'Message is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: Implement backend API call
      console.log('Form submitted:', formData);
      alert('Message sent! (Backend not implemented yet)');
      setFormData({ name: '', email: '', message: '' });
      setIsContactOpen(false);
    }
  };

  const handleInputChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background Map - Always fullscreen */}
      <div className="absolute inset-0 z-0">
        <WorldNetworkMap />
      </div>

      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black bg-opacity-20 backdrop-blur-sm border-b border-cyan-500 border-opacity-30">
        <div className="flex items-center justify-between px-4 py-2 md:px-6 md:py-3">
          <div className="flex items-center space-x-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/assets/images/logo.svg" 
              alt="Lions of Zion Logo" 
              width={200} 
              height={80}
              className="h-8 w-auto md:h-10"
            />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => setIsContactOpen(true)}
              className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
            >
              Contact
            </button>
            <a 
              href="#telegram" 
              className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
            >
              Telegram
            </a>
            <a 
              href="#about" 
              className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
            >
              About
            </a>
          </nav>
          
          {/* Mobile Hamburger Menu */}
          <button 
            className="md:hidden text-cyan-400 hover:text-cyan-300 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black bg-opacity-90 backdrop-blur-sm border-t border-cyan-500 border-opacity-30">
            <nav className="px-4 py-3 space-y-3">
              <button 
                onClick={() => {
                  setIsContactOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
              >
                Contact
              </button>
              <a 
                href="#telegram" 
                className="block text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Telegram
              </a>
              <a 
                href="#about" 
                className="block text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section - Central Message */}
      <div className="fixed inset-0 z-30 flex items-center justify-center pointer-events-none">
        <div className="text-center px-4 max-w-4xl">
          {/* Main Message */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-white glow-cyan animate-pulse">Truth.</span>
            <span className="block text-cyan-400 glow-cyan">Action.</span>
            <span className="block text-yellow-400" style={{ textShadow: '0 0 10px #facc15, 0 0 20px #facc15, 0 0 30px #facc15' }}>Unity.</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
            <span className="block">Exposing truth. Generating response.</span>
            <span className="block text-cyan-300">Connecting the world.</span>
          </p>
          
          {/* Main CTA Button */}
          <div className="pointer-events-auto">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 glow-box animate-pulse">
              <span className="relative z-10">Join as Consciousness Partners</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute inset-0 rounded-lg animate-pulse" style={{ 
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3), 0 0 60px rgba(0, 255, 255, 0.1)' 
              }}></div>
            </button>
          </div>
        </div>
      </div>

      {/* Social Media Buttons - Fixed Position */}
      <div className="fixed top-16 left-4 md:bottom-4 md:top-auto md:left-4 z-50 flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2">
        <a
          href="https://t.co/Ui1wGLZcgj"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 bg-black bg-opacity-80 backdrop-blur-sm rounded-full hover:bg-opacity-100 transition-all duration-300 glow-box group"
          aria-label="Follow us on X"
        >
          <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        
        <a
          href="https://www.paypal.com/paypalme/hanudaniel"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 bg-blue-600 bg-opacity-80 backdrop-blur-sm rounded-full hover:bg-opacity-100 transition-all duration-300 glow-box group"
          aria-label="Support via PayPal"
        >
          <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm1.417-8.033l2.443-15.526h-8.4L.93 21.337h4.563z"/>
          </svg>
        </a>
        
        <a
          href="https://buymeacoffee.com/danielhanukayeb"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 bg-yellow-500 bg-opacity-80 backdrop-blur-sm rounded-full hover:bg-opacity-100 transition-all duration-300 glow-box group"
          aria-label="Buy me a coffee"
        >
          <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-.732-1.693-.326-.504-.71-.943-1.135-1.304-.424-.361-.895-.655-1.394-.87a3.928 3.928 0 0 0-1.694-.36c-.26 0-.494.042-.494.042h-8.312c-.26 0-.494-.042-.494-.042a3.928 3.928 0 0 0-1.694.36c-.499.215-.97.509-1.394.87-.425.361-.809.8-1.135 1.304-.344.53-.613 1.095-.732 1.693l-.132.666c-.119.598-.119 1.163 0 1.693l.132.666c.119.598.388 1.163.732 1.693.326.504.71.943 1.135 1.304.424.361.895.655 1.394.87.499.215 1.02.36 1.694.36.26 0 .494-.042.494-.042h8.312c.26 0 .494.042.494.042.674 0 1.195-.145 1.694-.36.499-.215.97-.509 1.394-.87.425-.361.809-.8 1.135-1.304.344-.53.613-1.095.732-1.693l.132-.666c.119-.53.119-1.095 0-1.693z"/>
          </svg>
        </a>
      </div>

      {/* Telegram Feed Widget - Responsive */}
      <div className="fixed top-20 right-4 w-80 max-w-[calc(100vw-2rem)] md:w-80 z-40 bg-black bg-opacity-40 backdrop-blur-sm rounded-lg border border-cyan-500 border-opacity-30 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-cyan-400 font-semibold text-sm">Telegram Channel</h3>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse consciousness-indicator"></div>
        </div>
        <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
          <div className="text-xs text-gray-300 bg-gray-800 bg-opacity-50 rounded p-2">
            <div className="text-cyan-300 font-medium">@LionsOfZion</div>
            <div className="mt-1">Truth network operational. All consciousness nodes active 🌐</div>
            <div className="text-gray-400 text-xs mt-1">2 min ago</div>
          </div>
          <div className="text-xs text-gray-300 bg-gray-800 bg-opacity-50 rounded p-2">
            <div className="text-cyan-300 font-medium">@LionsOfZion</div>
            <div className="mt-1">AI verification systems online. Ready for truth analysis ⚡</div>
            <div className="text-gray-400 text-xs mt-1">5 min ago</div>
          </div>
        </div>
        <a 
          href="https://t.me/lionsotzion" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block mt-3 text-center text-cyan-400 hover:text-cyan-300 text-xs font-medium transition-colors interactive-hover"
        >
          Join Channel →
        </a>
      </div>

      {/* Watermark */}
      <div className="fixed bottom-4 right-4 z-50 text-cyan-400 text-xs font-medium glow-cyan opacity-80">
        @LionsOfZion
      </div>

      {/* Main Content Sections - Scrollable below hero */}
      <div className="fixed inset-0 z-20 overflow-y-auto custom-scrollbar" style={{ paddingTop: '100vh' }}>
        <div className="min-h-screen bg-gradient-to-b from-transparent via-black/70 to-black/90">
          
          {/* Section 1: Live Feed */}
          <section className="section-spacing px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="content-overlay rounded-lg p-6 md:p-8 mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 glow-cyan mb-6 techno-hebrew">
                  📡 Live Feed
                </h2>
                <p className="text-gray-300 mb-6 body-global">
                  Real-time updates from X, Telegram, and internal intelligence networks
                </p>
                
                {/* Feed Filters */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <button className="px-4 py-2 bg-cyan-600/20 text-cyan-400 rounded-lg border border-cyan-500/30 hover:bg-cyan-600/30 transition-all interactive-hover">
                    All Sources
                  </button>
                  <button className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg border border-gray-600/30 hover:bg-gray-700/50 transition-all interactive-hover">
                    X/Twitter
                  </button>
                  <button className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg border border-gray-600/30 hover:bg-gray-700/50 transition-all interactive-hover">
                    Telegram
                  </button>
                  <button className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg border border-gray-600/30 hover:bg-gray-700/50 transition-all interactive-hover">
                    Geographic
                  </button>
                </div>

                {/* Live Feed Items */}
                <div className="space-y-4">
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-cyan-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full consciousness-indicator"></div>
                        <span className="text-cyan-300 font-medium">@LionsOfZion</span>
                        <span className="text-xs text-gray-400">X Platform</span>
                      </div>
                      <span className="text-xs text-gray-400">2 min ago</span>
                    </div>
                    <p className="text-gray-300 body-global">Latest intelligence report: Network operational status confirmed across all consciousness nodes. Truth verification systems online. 🌐</p>
                  </div>
                  
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-cyan-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-400 rounded-full consciousness-indicator"></div>
                        <span className="text-cyan-300 font-medium">Global Alert</span>
                        <span className="text-xs text-gray-400">Multiple Sources</span>
                      </div>
                      <span className="text-xs text-gray-400">5 min ago</span>
                    </div>
                    <p className="text-gray-300 body-global">Disinformation pattern detected across European networks. Response protocols activated. Analysis in progress...</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: AI Fake News Detection */}
          <section className="section-spacing px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="content-overlay rounded-lg p-6 md:p-8 mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 glow-yellow mb-6 techno-hebrew">
                  🤖 AI Truth Verification
                </h2>
                <p className="text-gray-300 mb-6 body-global">
                  Advanced AI system for detecting fake news and disinformation campaigns
                </p>
                
                {/* Truth Check Interface */}
                <div className="space-y-4">
                  <div className="relative">
                    <textarea
                      placeholder="Paste text, URL, or claim to verify..."
                      className="w-full h-32 px-4 py-3 bg-gray-900/70 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 resize-none body-global"
                    />
                  </div>
                  
                  <button className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105 interactive-hover">
                    🔍 Check Truth
                  </button>
                  
                  {/* Sample Result Display */}
                  <div className="mt-6 p-4 bg-green-900/30 border border-green-500/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-green-400 font-bold">VERIFIED TRUE</span>
                      <span className="text-xs text-gray-400">Confidence: 94%</span>
                    </div>
                    <p className="text-gray-300 text-sm body-global">
                      Cross-referenced with multiple reliable sources. No contradiction patterns detected.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Smart Response System */}
          <section className="section-spacing px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="content-overlay rounded-lg p-6 md:p-8 mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gold-400 glow-gold mb-6 techno-hebrew">
                  🧠 Smart Response System
                </h2>
                <p className="text-gray-300 mb-6 body-global">
                  AI-generated responses to counter disinformation with accurate, shareable content
                </p>
                
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="What response do you need? e.g., 'Counter fake news about Israel in Europe'"
                      className="w-full px-4 py-3 bg-gray-900/70 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 body-global"
                    />
                  </div>
                  
                  <button className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-orange-500 hover:from-yellow-500 hover:to-orange-400 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 interactive-hover">
                    ⚡ Generate Response
                  </button>
                  
                  {/* Sample Generated Response */}
                  <div className="mt-6 p-4 bg-gray-900/50 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-yellow-400 font-bold">Ready-to-Share Content</span>
                      <button className="text-cyan-400 hover:text-cyan-300 text-sm">📋 Copy</button>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded text-gray-300 text-sm body-global">
                      &quot;Fact-check: The claim circulating about [topic] lacks verification from credible sources. Here are the verified facts: [accurate information with sources]. #TruthMatters #FactCheck&quot;
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <button className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded text-xs border border-blue-500/30">
                        📱 Instagram Format
                      </button>
                      <button className="px-3 py-1 bg-cyan-600/20 text-cyan-400 rounded text-xs border border-cyan-500/30">
                        🐦 Twitter Format
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Consciousness Archive */}
          <section className="section-spacing px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="content-overlay rounded-lg p-6 md:p-8 mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 glow-cyan mb-6 techno-hebrew">
                  🗄️ Consciousness Archive
                </h2>
                <p className="text-gray-300 mb-6 body-global">
                  Comprehensive database of disinformation patterns, investigations, and verified intelligence
                </p>
                
                {/* Search and Filter Interface */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Search archive..."
                    className="px-4 py-2 bg-gray-900/70 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 body-global"
                  />
                  <select className="px-4 py-2 bg-gray-900/70 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 body-global">
                    <option>All Countries</option>
                    <option>Europe</option>
                    <option>Middle East</option>
                    <option>Americas</option>
                    <option>Asia-Pacific</option>
                  </select>
                  <select className="px-4 py-2 bg-gray-900/70 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 body-global">
                    <option>All Types</option>
                    <option>Social Media</option>
                    <option>News Outlets</option>
                    <option>Government</option>
                    <option>Academic</option>
                  </select>
                </div>
                
                {/* Archive Items */}
                <div className="space-y-3">
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-cyan-500/20 interactive-hover cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-cyan-300 font-medium">European Disinformation Pattern #2024-001</span>
                      <span className="text-xs text-gray-400">🔗 External Link</span>
                    </div>
                    <p className="text-gray-300 text-sm body-global">Coordinated campaign detected across 12 European social networks targeting Middle East narratives...</p>
                    <div className="flex space-x-2 mt-2">
                      <span className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-xs">Social Media</span>
                      <span className="px-2 py-1 bg-purple-600/20 text-purple-400 rounded text-xs">Europe</span>
                      <span className="px-2 py-1 bg-red-600/20 text-red-400 rounded text-xs">High Priority</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-cyan-500/20 interactive-hover cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-cyan-300 font-medium">Investigation Report: Network Analysis</span>
                      <span className="text-xs text-gray-400">📊 Full Report</span>
                    </div>
                    <p className="text-gray-300 text-sm body-global">Comprehensive analysis of bot networks and their coordination patterns across platforms...</p>
                    <div className="flex space-x-2 mt-2">
                      <span className="px-2 py-1 bg-green-600/20 text-green-400 rounded text-xs">Research</span>
                      <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 rounded text-xs">Global</span>
                      <span className="px-2 py-1 bg-orange-600/20 text-orange-400 rounded text-xs">Medium Priority</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Awareness Space */}
          <section className="section-spacing px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="content-overlay rounded-lg p-6 md:p-8 mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 glow-yellow mb-6 techno-hebrew">
                  📢 Awareness Space
                </h2>
                <p className="text-gray-300 mb-6 body-global">
                  Ready-to-share content library: infographics, posts, and educational materials
                </p>
                
                {/* Content Categories */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-yellow-500/30 interactive-hover cursor-pointer">
                    <div className="text-center">
                      <div className="text-4xl mb-3">📊</div>
                      <h3 className="text-yellow-400 font-bold mb-2">Infographics</h3>
                      <p className="text-gray-300 text-sm body-global">Visual data presentations and fact sheets</p>
                      <div className="mt-3 text-cyan-400 text-sm">47 items available</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-yellow-500/30 interactive-hover cursor-pointer">
                    <div className="text-center">
                      <div className="text-4xl mb-3">📱</div>
                      <h3 className="text-yellow-400 font-bold mb-2">Social Posts</h3>
                      <p className="text-gray-300 text-sm body-global">Ready-made content for all platforms</p>
                      <div className="mt-3 text-cyan-400 text-sm">128 items available</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-yellow-500/30 interactive-hover cursor-pointer">
                    <div className="text-center">
                      <div className="text-4xl mb-3">🎬</div>
                      <h3 className="text-yellow-400 font-bold mb-2">Video Scripts</h3>
                      <p className="text-gray-300 text-sm body-global">Educational video templates and scripts</p>
                      <div className="mt-3 text-cyan-400 text-sm">23 items available</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Community and Donations */}
          <section className="section-spacing px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="content-overlay rounded-lg p-6 md:p-8 mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 glow-cyan mb-6 techno-hebrew">
                  💬 Join the Consciousness Network
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Community Sign-up */}
                  <div>
                    <h3 className="text-xl font-bold text-yellow-400 mb-4 glow-yellow">Become a Consciousness Partner</h3>
                    <p className="text-gray-300 mb-6 body-global">
                      Join our global network of truth advocates and digital activists
                    </p>
                    
                    <form className="space-y-4">
                      <input
                        type="email"
                        placeholder="Your email"
                        className="w-full px-4 py-3 bg-gray-900/70 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 body-global"
                      />
                      <select className="w-full px-4 py-3 bg-gray-900/70 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 body-global">
                        <option>Select your region</option>
                        <option>North America</option>
                        <option>Europe</option>
                        <option>Middle East</option>
                        <option>Asia-Pacific</option>
                        <option>Other</option>
                      </select>
                      <select className="w-full px-4 py-3 bg-gray-900/70 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 body-global">
                        <option>Type of involvement</option>
                        <option>Content Creator</option>
                        <option>Researcher</option>
                        <option>Social Media Activist</option>
                        <option>Technical Support</option>
                        <option>General Support</option>
                      </select>
                      <button className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-lg transition-all duration-300 interactive-hover">
                        Join the Network
                      </button>
                    </form>
                  </div>
                  
                  {/* Donations */}
                  <div>
                    <h3 className="text-xl font-bold text-yellow-400 mb-4 glow-yellow">Support Our Mission</h3>
                    <p className="text-gray-300 mb-6 body-global">
                      Help us maintain and expand our truth verification systems
                    </p>
                    
                    {/* Quick Donation Options */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <button className="py-3 px-4 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition-all interactive-hover">
                        💳 PayPal
                      </button>
                      <button className="py-3 px-4 bg-orange-600/20 text-orange-400 border border-orange-500/30 rounded-lg hover:bg-orange-600/30 transition-all interactive-hover">
                        ₿ Bitcoin
                      </button>
                      <button className="py-3 px-4 bg-green-600/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-600/30 transition-all interactive-hover">
                        💰 Bank Transfer
                      </button>
                      <button className="py-3 px-4 bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-all interactive-hover">
                        🎁 Other
                      </button>
                    </div>
                    
                    {/* Transparency Video Placeholder */}
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-cyan-500/20 text-center">
                      <div className="text-4xl mb-2">🎥</div>
                      <h4 className="text-cyan-400 font-bold mb-2">How We Use Your Support</h4>
                      <p className="text-gray-300 text-sm body-global">Watch our transparency report</p>
                      <button className="mt-3 px-4 py-2 bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 rounded hover:bg-cyan-600/30 transition-all">
                        ▶️ Play Video
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="section-spacing px-4 md:px-8 bg-black/50">
            <div className="max-w-6xl mx-auto text-center">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 glow-cyan mb-4 techno-hebrew">
                @LionsOfZion | Truth. Action. Unity.
              </div>
              <div className="flex justify-center space-x-6 text-gray-400">
                <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">Contact</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">About</a>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Contact Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsContactOpen(false)}
          ></div>
          <div className="relative bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg border border-cyan-500 border-opacity-50 p-6 w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-cyan-400">Contact Us</h2>
              <button
                onClick={() => setIsContactOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close contact form"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  className={`w-full px-3 py-2 bg-gray-800 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    formErrors.name ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Your name"
                />
                {formErrors.name && (
                  <p className="mt-1 text-xs text-red-400">{formErrors.name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  className={`w-full px-3 py-2 bg-gray-800 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    formErrors.email ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="your@email.com"
                />
                {formErrors.email && (
                  <p className="mt-1 text-xs text-red-400">{formErrors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange('message')}
                  className={`w-full px-3 py-2 bg-gray-800 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none ${
                    formErrors.message ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Your message..."
                />
                {formErrors.message && (
                  <p className="mt-1 text-xs text-red-400">{formErrors.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
