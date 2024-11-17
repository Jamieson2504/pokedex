/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: '425px',
      sm: '540px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
      '2xl': '1440px',
    },

    colors: {
      black: '#000000',
      white: '#FFFFFF',
      transparent: 'transparent',
      red: '#FF0000',
      darkred: '#CC0000',
      blue: '#3B4CCA',
      yellow: '#FFDE00',
      gold: '#B3A125',
    },

    fontFamily: {
      title: [ "pokemon" ],
      sans: [ "sans-serif" ]
    },
    extend: {},
  },
  plugins: [],
}

