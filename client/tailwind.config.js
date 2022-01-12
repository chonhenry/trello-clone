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
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
  variants: {
    outline: ["focus"],
  },
};
