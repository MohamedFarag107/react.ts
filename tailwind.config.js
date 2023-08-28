/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        black: {
          100: "#d3d3d3",
          200: "#a7a7a7",
          300: "#7c7c7c",
          400: "#505050",
          500: "#242424",
          600: "#1d1d1d",
          700: "#161616",
          800: "#0e0e0e",
          900: "#070707",
        },
      },
    },

    container: {
      center: true,
      padding: "2rem",
    },
  },
  plugins: [],
};