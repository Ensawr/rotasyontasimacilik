/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef5fb',
          100: '#d9e8f4',
          200: '#b4d0e8',
          300: '#7aafd0',
          400: '#3d89b3',
          500: '#1a6a96',
          600: '#0d5480',
          700: '#0a466c',
          800: '#083a59',
          900: '#003D6B',
          950: '#002844',
        },
        ink: {
          DEFAULT: '#07090f',
          raised: '#10131a',
          soft: '#161a24',
        },
        accent: {
          300: '#f5b56a',
          400: '#f09a40',
          500: '#EA8825',
          600: '#d0701a',
          700: '#b05c14',
        },
        teal: {
          300: '#4db8b9',
          400: '#26a0a1',
          500: '#008081',
          600: '#006668',
          700: '#004f50',
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        sans: ['"Source Sans 3"', 'sans-serif'],
      },
      screens: {
        xs: '400px',
      },
    },
  },
  plugins: [],
};
