// /** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@Praxeum-ai/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        main: "#5A51E6",
        hover: "#3A31C6",
        light: "#5A51E619",
        primary: "#030036BD", // ALPHA = 74% => hex((74 /100) * 256) => 0xBD
      },
    },
  },
  plugins: [],
});
