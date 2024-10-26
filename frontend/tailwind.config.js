/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      slate: {
        500: '#64748B', // Light slate color
        600: '#475569', // Darker slate color
        700: '#334155', // Even darker slate color
      },
      teal: {
        500: '#14B8A6', // Light teal color
        600: '#0D9488', // Darker teal color
        700: '#0F766E', // Even darker teal color
    },
  },
  plugins: [],
}
}

