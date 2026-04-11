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
        }
      },
      fontFamily: {
        heading: ['Cinzel', 'serif'], // Elegant serif for large titles
        sans: ['Inter', 'sans-serif'], // Clean modern sans for body/nav
      }
    },
  },
  plugins: [],
}