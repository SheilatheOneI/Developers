const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust according to your project structure
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        moonstone: "#639fab",
        lapis: "#1c5d99",
        powder: "#bbcde5",
      },
      backgroundImage: {
        landing: "url('src/images/landing2.png')",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
