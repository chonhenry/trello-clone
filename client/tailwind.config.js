const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cool_gray: "rgb(38,70,83)",
        peacock_green: "rgb(42,157,143)",
        yellow_ochre: "rgb(233,196,106)",
        deep_orange: "rgb(244,162,97)",
        cadmium_orange: "rgb(231,111,81)",
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
