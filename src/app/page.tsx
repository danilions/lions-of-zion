"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Report submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="relative min-h-screen">
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: "url('/backgrounds/hero-background.svg')"
        }}
      />
      
      {/* Header */}
      <header className="relative z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/assets/images/logo.png.svg"
                alt="Lions of Zion Logo"
                width={48}
                height={48}
                className="h-12 w-auto"
              />
              <h1 className="text-2xl font-display font-bold text-neutral-900">
                Lions of Zion
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#live-feed" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
                Live Reports
              </a>
              <a href="#submit-report" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
                Submit Report
              </a>
              <a href="#support" className="text-neutral-700 hover:text-primary-600 font-medium transition-colors">
                Support
              </a>
            </nav>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center space-x-2 bg-secondary-100 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse"></div>
              <span className="text-secondary-700 font-medium">Live Monitoring Active</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-neutral-900 leading-tight">
              Defend Truth.
              <span className="block text-primary-600">Expose Lies.</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              AI-powered intelligence platform detecting misinformation in real-time across global networks
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <a
                href="#live-feed"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                View Live Reports
              </a>
              <a
                href="#submit-report"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold rounded-lg text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Submit Report
              </a>
            </div>
          </div>
        </section>

        {/* Live Telegram Feed Section */}
        <section id="live-feed" className="py-20 bg-white/90 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 text-center mb-12">
                Live Reports from Telegram
              </h2>
              
              <div className="bg-white rounded-2xl shadow-soft border border-gray-200 p-8">
                <div className="aspect-video bg-neutral-50 rounded-lg border-2 border-dashed border-neutral-300 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-medium text-neutral-700">Telegram Feed Integration</p>
                      <p className="text-neutral-500">Live reports and updates will appear here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* User Report Submission Section */}
        <section id="submit-report" className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 mb-4">
                  Submit a Report
                </h2>
                <p className="text-lg text-neutral-600">
                  Help us identify misinformation by submitting your reports
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-soft border border-gray-200 p-8 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                    Report Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                    placeholder="Describe the misinformation or suspicious content you encountered..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Submit Report
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer with Social Links */}
      <footer id="support" className="bg-neutral-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="flex items-center justify-center space-x-4">
              <Image
                src="/assets/images/logo.png.svg"
                alt="Lions of Zion Logo"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <h3 className="text-2xl font-display font-bold">Lions of Zion</h3>
            </div>
            
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Supporting truth and transparency in the digital age
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://t.co/Ui1wGLZcgj"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-neutral-800 hover:bg-neutral-700 px-6 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span className="font-medium">Follow on X/Twitter</span>
              </a>
              
              <a
                href="https://www.paypal.com/paypalme/hanudaniel"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.41c-.013.04-.026.08-.04.12-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106-.32 2.027a.641.641 0 0 0 .633.74h3.863c.524 0 .968-.382 1.05-.9l.048-.304.918-5.82.059-.32c.082-.518.526-.9 1.05-.9h.661c3.757 0 6.7-1.527 7.556-5.946.357-1.846.174-3.388-.777-4.471-.284-.324-.618-.592-.993-.784z"/>
                </svg>
                <span className="font-medium">Donate via PayPal</span>
              </a>
              
              <a
                href="https://buymeacoffee.com/danielhanukayeb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-.766-1.613a4.44 4.44 0 0 0-1.364-1.04c-.354-.208-.738-.38-1.135-.519C14.26 2.104 11.671 2.5 9.13 3.432a8.987 8.987 0 0 0-2.219 1.074c-.394.304-.736.67-1.014 1.086a4.85 4.85 0 0 0-.532 1.415l-.13.653c-.045.228-.068.46-.068.694 0 .946.368 1.848 1.036 2.54.668.693 1.554 1.107 2.496 1.168l.05.003c.315.016.631.016.946 0 .946-.061 1.828-.475 2.496-1.168.668-.692 1.036-1.594 1.036-2.54 0-.234-.023-.466-.068-.694z"/>
                </svg>
                <span className="font-medium">Buy Me a Coffee</span>
              </a>
            </div>
            
            <div className="border-t border-neutral-700 pt-8">
              <p className="text-neutral-400">
                © 2025 Lions of Zion. Fighting misinformation with truth and transparency.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}