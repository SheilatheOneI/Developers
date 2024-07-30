const { nextui } = require("@nextui-org/react");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "blue-700": "#F13223",
        "blue-500": "#F13223",
        "blue-300": "#F13223",
        "blue-200": "#F13223",
        "blue-100": "#F13223",
        "yellow-500": "#F13223",
        moonstone: "#F13223",
        lapis: "#F13223",
        powder: "#F13223",
      },
      fontFamily: {
        lora: ['Lora', 'serif'],
        openSans: ['Open Sans', 'sans-serif'],
      },
      
    },
  },
  variants: {
    extend: {},
  },
  plugins: [nextui()],
};
