const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
    flowbite.content()
  ],
  theme: {
    fontFamily: {
      'body': "'Montserrat'",
    },
    boxShadow: {
      'cart': '0px 0px 10px rgba(0, 0, 0, 0.25)'
    },
    extend: {},
  },
  plugins: [flowbite.plugin()],
}

