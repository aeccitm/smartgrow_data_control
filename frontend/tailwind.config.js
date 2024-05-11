/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#6A994E',
        secondary: '#A7C957',
        tertiary: '#F2E8CF',
        quartiary: '#BC4749',
        quintenary: '#F7F7F7'
      },
      fontFamily:{
        primary:['Quicksand','sans-serif']
      }
    },
    
  },
  plugins: [],
}

