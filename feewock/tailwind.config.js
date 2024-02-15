/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue':'#3E84A8',
        'custom-voilate':'#551B8C',
          primary: "#0371b7",

      },container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
      
      spacing:{
        '40':'40px'
      },
      
    },
  },
  plugins: [require("daisyui")],
  variants:{},
  plugins: [],
}

