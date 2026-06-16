/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        brand: {
          burgundy: '#8B263E',    // Primary Dark Golden Orange
          light: '#F8F9FA',   // Background Light
          green: '#22C55E',   // Available status
          orange: '#EA580C',  // Reserved status (darker)
          red: '#DC2626',     // Occupied status (darker)
        }
      }
    },
  },
  plugins: [],
}
