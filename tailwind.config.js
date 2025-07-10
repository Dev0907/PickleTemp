/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        // Sports theme: Blue, Yellow, Green
        'sport-blue': '#1E40AF',      // Primary blue
        'sport-blue-light': '#3B82F6', // Light blue
        'sport-blue-dark': '#1E3A8A',  // Dark blue
        'sport-yellow': '#FCD34D',     // Primary yellow
        'sport-yellow-light': '#FEF3C7', // Light yellow
        'sport-yellow-dark': '#F59E0B', // Dark yellow
        'sport-green': '#10B981',      // Primary green
        'sport-green-light': '#6EE7B7', // Light green
        'sport-green-dark': '#047857', // Dark green
        'sport-gray': '#F3F4F6',       // Light background
        'sport-gray-dark': '#374151',  // Dark text
      },
    },
  },
  plugins: [],
};