/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "320px",
      sm: "640px",
      xl: "1280px",
    },
    extend: {},
  },
  variants: {
    extend: {
      scale: ["hover"],
      textColor: ["hover"],
    },
  },
  plugins: [],
});
