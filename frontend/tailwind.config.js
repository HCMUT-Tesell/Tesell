/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
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
  plugins: []
}

