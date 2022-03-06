const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Cal Sans", ...defaultTheme.fontFamily.sans],
        body: ["Nunito", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        "3xl": "0 13.6301px 35.58px -6.81507px rgba(77, 71, 254, 0.36)",
      },
      transitionProperty: {
        width: "width",
        height: "height",
      },
      colors: {
        "gradient-blue-one": "#3A38FB",
        "gradient-blue-two": "#7471FF",
      },
    },
  },
  plugins: [],
};
