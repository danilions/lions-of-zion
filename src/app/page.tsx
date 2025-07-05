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
            <img 
              src="/assets/images/logo.svg" 
              alt="Lions of Zion Logo" 
              width={200} 
              height={80}
              className="h-8 w-auto md:h-10"
            />
          </div>
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
        </div>
      </header>

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

      {/* Telegram Feed Widget - Fixed */}
      <div className="fixed top-20 right-4 w-80 max-w-[calc(100vw-2rem)] z-40 bg-black bg-opacity-40 backdrop-blur-sm rounded-lg border border-cyan-500 border-opacity-30 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-cyan-400 font-semibold text-sm">Telegram Channel</h3>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
          <div className="text-xs text-gray-300 bg-gray-800 bg-opacity-50 rounded p-2">
            <div className="text-cyan-300 font-medium">@LionsOfZion</div>
            <div className="mt-1">Latest updates and network insights...</div>
            <div className="text-gray-400 text-xs mt-1">2 min ago</div>
          </div>
          <div className="text-xs text-gray-300 bg-gray-800 bg-opacity-50 rounded p-2">
            <div className="text-cyan-300 font-medium">@LionsOfZion</div>
            <div className="mt-1">Network status: All nodes operational 🌐</div>
            <div className="text-gray-400 text-xs mt-1">5 min ago</div>
          </div>
        </div>
        <a 
          href="https://t.me/lionsotzion" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block mt-3 text-center text-cyan-400 hover:text-cyan-300 text-xs font-medium transition-colors"
        >
          Join Channel →
        </a>
      </div>

      {/* Watermark */}
      <div className="fixed bottom-4 right-4 z-50 text-cyan-400 text-xs font-medium glow-cyan opacity-80">
        @LionsOfZion
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
