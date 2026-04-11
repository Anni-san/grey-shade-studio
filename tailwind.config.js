/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        premium: {
          paper: '#f2f0ef', // That grainy cream background
          gold: '#b09476',  // The muted gold/copper text color
          dark: '#1a1817',  // The dark brown/black for the "Book Now" circle
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}