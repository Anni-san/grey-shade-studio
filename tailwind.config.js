/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0a0a0a', 
          lighter: '#1a1a1a', 
          accent: '#ffffff', // Clean white accent for high contrast
        },
        grey: {
          DEFAULT: '#94a3b8',
          light: '#cbd5e1',
        },
        royal: {
          gold: '#c4a77d', // Brushed gold accent color from reference
          brass: '#b09476', // Deeper brass accent color
          deep: '#141414', // Deep, textured charcoal-black for panels
        }
      },
      fontFamily: {
        heading: ['Bodoni Moda', 'serif'], // Elegant classical serif for large titles
        sans: ['Inter', 'sans-serif'], // Clean modern sans for body/nav
      },
      backgroundImage: {
        'carrara-gold': "url('https://www.transparenttextures.com/patterns/dark-linen.png'), url('https://www.transparenttextures.com/patterns/black-linen-2.png')", // Layered texture for marble
      }
    },
  },
  plugins: [],
}