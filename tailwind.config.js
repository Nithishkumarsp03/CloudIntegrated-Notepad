/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        iconHover: {
          "0%": { right: "-20px", opacity: "0.8" },
          "100%": { right: "120px" },
        },
        iconAnim: {
          "0%": { right: "120px" },
          "100%": { right: "-120px", opacity: "0" },
        },
        iconHoverSmall: {
          "0%": { right: "-20px", opacity: "0.8" },
          "100%": { right: "80px" },
        },
        iconAnimSmall: {
          "0%": { right: "80px" },
          "100%": { right: "-120px", opacity: "0" },
        },
      },
      animation: {
        iconHover: "iconHover 0.7s ease-in forwards",
        iconAnim: "iconAnim 1s ease-out",
        iconHoverSmall: "iconHoverSmall 0.7s ease-in forwards",
        iconAnimSmall: "iconAnimSmall 1s ease-out",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
