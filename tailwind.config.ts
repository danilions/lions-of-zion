import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary': ['Orbitron', 'Montserrat', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // LIONSOFZION Brand Colors
        'neon-blue': '#00AEEF',
        'cyber-blue': '#0099CC',
        'light-blue': '#4DC8F0',
        'dark-navy': '#0A0E1A',
        'deep-black': '#000000',
        'cyber-gray': '#1A1F2E',
        'light-gray': '#B0B8C5',
        'glow-cyan': '#00FFFF',
        'warning-orange': '#FF8C00',
        
        // Gradient stops
        'gradient-start': '#0A0E1A',
        'gradient-end': '#000000',
        
        // Interactive states
        'button-primary': '#00AEEF',
        'button-hover': '#0099CC',
        'button-active': '#007AA3',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #0A0E1A 0%, #000000 100%)',
        'button-gradient': 'linear-gradient(135deg, #00AEEF 0%, #00FFFF 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(26, 31, 46, 0.8) 0%, rgba(10, 14, 26, 0.9) 100%)',
      },
      boxShadow: {
        'neon': '0 0 10px #00AEEF, 0 0 20px #00AEEF, 0 0 30px #00AEEF',
        'neon-lg': '0 0 20px #00AEEF, 0 0 40px #00AEEF, 0 0 60px #00AEEF',
        'cyber': '0 4px 20px rgba(0, 174, 239, 0.3)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.5)',
      },
      textShadow: {
        'neon': '0 0 10px #00AEEF, 0 0 20px #00AEEF',
        'glow': '0 0 5px rgba(0, 174, 239, 0.8)',
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite alternate',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'lion-breathe': 'lion-breathe 4s ease-in-out infinite',
      },
      keyframes: {
        'pulse-neon': {
          '0%': { 
            textShadow: '0 0 5px #00AEEF, 0 0 10px #00AEEF, 0 0 15px #00AEEF',
            boxShadow: '0 0 5px #00AEEF, 0 0 10px #00AEEF'
          },
          '100%': { 
            textShadow: '0 0 10px #00AEEF, 0 0 20px #00AEEF, 0 0 30px #00AEEF',
            boxShadow: '0 0 10px #00AEEF, 0 0 20px #00AEEF'
          },
        },
        'glow': {
          '0%': { opacity: '0.8' },
          '100%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'lion-breathe': {
          '0%, 100%': {
            opacity: '0.8',
            transform: 'scale(1) translateY(0)',
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1.05) translateY(-3px)',
          },
        },
      },
    },
  },
  plugins: [
    // Custom plugin for text shadows
    function({ addUtilities }: any) {
      const newUtilities = {
        '.text-shadow-neon': {
          textShadow: '0 0 10px #00AEEF, 0 0 20px #00AEEF',
        },
        '.text-shadow-glow': {
          textShadow: '0 0 5px rgba(0, 174, 239, 0.8)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      }
      addUtilities(newUtilities)
    }
  ],
} satisfies Config;
