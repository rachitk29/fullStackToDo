/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        card: "#1e293b",
        mint: "#a7f3d0",
        sky: "#67e8f9",
        grape: "#c4b5fd",
        lime: "#a3e635"
      }
    }
  },
  plugins: []
};
