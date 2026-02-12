/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        cyber: ['Orbitron', 'sans-serif'],
        ethereal: ['Playfair Display', 'serif'],
        minimal: ['Inter', 'sans-serif'],
      },
      colors: {
        cyber: {
          bg: '#050505',
          primary: '#00f3ff',
          secondary: '#bc13fe',
          accent: '#ffe600'
        },
        ethereal: {
          bg: '#fdfbf7',
          primary: '#8b9d83',
          secondary: '#d4c5b0',
          accent: '#e6b8a2'
        },
        minimal: {
          bg: '#ffffff',
          primary: '#000000',
          secondary: '#333333',
          accent: '#666666'
        }
      },
      animation: {
        'glitch': 'glitch 1s linear infinite',
        'bloom': 'bloom 2s ease-out forwards',
        'unfold': 'unfold 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 4s linear infinite',
        'spin-slow': 'spin 10s linear infinite',
      },
      keyframes: {
        glitch: {
          '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
          '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
          '62%': { transform: 'translate(0,0) skew(5deg)' },
        },
        bloom: {
          '0%': { opacity: '0', transform: 'scale(0.9) translateY(20px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        unfold: {
          '0%': { opacity: '0', height: '0' },
          '100%': { opacity: '1', height: 'auto' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scan: {
          '0%': { top: '-10%' },
          '100%': { top: '110%' },
        }
      }
    },
  },
  plugins: [],
}
