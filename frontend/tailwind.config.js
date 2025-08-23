/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        figtree: ["Figtree", "sans-serif"],
      },
      colors: {
          heroBg: '#1c2a1f',
      },
    },
  },
  plugins: [],
}