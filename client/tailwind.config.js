const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark_green: "rgb(23, 37, 42)",
        peacock_green: "rgb(43, 122, 120)",
        green: "rgb(58, 175, 169)",
        light_green: "rgb(222, 242, 241)",
        white: "rgb(254, 255, 255)",
        col_background: "rgb(235,236,240)",
        card_background: "rgb(255,255,255)",
      },
    },
  },
  // plugins: [require("@tailwindcss/forms")],
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".content-auto": {
          "c-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      });
    }),
  ],
  variants: {
    outline: ["focus"],
  },
};

// https://visme.co/blog/wp-content/uploads/2016/09/website24-1024x512.jpg
