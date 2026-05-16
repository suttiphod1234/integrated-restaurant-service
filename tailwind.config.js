/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fefcf0',
          100: '#fdf6d6',
          200: '#fbe9a1',
          300: '#f8d660',
          400: '#f5be2c',
          500: '#e5a510',
          600: '#c8820a',
          700: '#a15f0a',
          800: '#814b0f',
          900: '#6a3e11',
          950: '#3e2005',
        },
        charcoal: {
          50: '#f5f5f5',
          100: '#e9e9e9',
          200: '#d1d1d1',
          300: '#ababab',
          400: '#7d7d7d',
          500: '#5c5c5c',
          600: '#474747',
          700: '#333333',
          800: '#222222',
          900: '#111111',
          950: '#0a0a0a',
        }
      }
    },
  },
  plugins: [],
}
