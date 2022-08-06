/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/app.html", "./src/**/*.{html,js,svelte,ts}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      accent: {
        DEFAULT: "hsl(238, 40%, 52%)",
        soft: "hsl(239, 57%, 85%)",
      },
      red: {
        DEFAULT: "hsl(358, 79%, 66%)",
        pale: "hsl(357, 100%, 86%)",
      },
      neutral: {
        100: "hsl(0, 0%, 100%)",
        200: "hsl(228, 33%, 97%)",
        300: "hsl(223, 19%, 93%)",
        400: "hsl(211, 10%, 45%)",
        500: "hsl(212, 24%, 26%)",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Rubik", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        lg: ["1.0625rem", { lineHeight: "1.625rem" }],
      },
    },
  },
  plugins: [],
};
