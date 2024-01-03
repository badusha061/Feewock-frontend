/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue':'#3E84A8'
      },
      spacing:{
        '40':'40px'
      },
    },
  },
  variants:{},
  plugins: [],
}

