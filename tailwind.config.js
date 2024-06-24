const { nextui } = require("@nextui-org/react");


module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'blue-700': '#1C5D99',
        'blue-500': '#639FAB',
        'blue-300': '#BBCDE5',
        'blue-200': '#65318E',
        'blue-100': '#FFC300',
        'yellow-500': '#FFD700',
        moonstone: "#639fab",
        lapis: "#1c5d99",
        powder: "#bbcde5",
        
      },
    },
  },
  variants: {
    extend: {},
  },
  
  plugins: [nextui()],

};
