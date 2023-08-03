// /** @type {import('tailwindcss').Config} */
export default {
  content: ["src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        main: '#5A51E6',
        light: '#5A51E619',
        primary: '#030036BD', // A = BD = 74% => hex((74 /100) * 256)
      }
    },
  },
  plugins: [],
};
