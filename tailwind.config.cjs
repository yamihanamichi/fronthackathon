/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ← ajoute cette ligne !
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
