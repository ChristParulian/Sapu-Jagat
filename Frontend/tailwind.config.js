module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Montserrat", "sans-serif"],
        secondary: ["Open Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        opensans: ["Open Sans", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
        sans: ["Montserrat", "Open Sans", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          cream: "#FEFAE0",
          yellow: "#FFCF50",
          sage: "#A4B465",
          forest: "#626F47",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
