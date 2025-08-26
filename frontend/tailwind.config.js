/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f3f6ff',
          100: '#e7edff',
          200: '#c7d5ff',
          300: '#9db6ff',
          400: '#6e8cff',
          500: '#4667ff',
          600: '#2f49e6',
          700: '#2639b4',
          800: '#203391',
          900: '#1d2d76',
        },
      },
    },
  },
  plugins: [],
};
