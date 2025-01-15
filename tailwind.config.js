/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-blue': 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      },
    },
  },
  plugins: [],
}