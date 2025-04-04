import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        figma_primary: "#292A2C",
        figma_bg: "#121315"
      },
    },
  },
  plugins: [daisyui],

  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["night"],
          primary: "#FF4556",
          secondary: "#B9B9B9",
        }
      }
    ]
  }
}