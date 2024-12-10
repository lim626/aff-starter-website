/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules//@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules//@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1560px",
    },
    extend: {
      colors: {
        "secondary-bg": "#16181c",
        gold: "#FFD033",
        silver: "#C0C0C0",
        bronze: "#CD853F",
        "bo6-theme": "#ff9900",
        "sidebar-active-mw3": "#b0ff34",
        "sidebar-active-bo6": "#ff9900",
        "sidebar-hover-mw3": "#b0ff34",
        "sidebar-hover-bo6": "#ff9900",
      },
    },
  },
  plugins: [],
};
