/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        color: {
          1: "#AEECE7",
          2: "#4CB8C4",
          3: "#245A64",
          4: "#2D3E43",
          5: "#0e4061",
          6: "#f0e9dd",
        },
      },
    },
  },
  plugins: [],
};
