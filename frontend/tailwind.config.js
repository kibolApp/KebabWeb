/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        lightGray: '#D8D9CE',
        gold: '#DDA15E',
        darkGreen: '#283618',
        oliveGreen: '#606C38',
        brown: '#BC6C25',
        white: '#FFFFFF',
        black: '#000000',
        lightGrayish: '#F5F5F5',
        mediumGray: '#CCCCCC',
      },
    },
  },
  plugins: [],
};
