/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./resources/**/*.{edge,js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      gridTemplateRows: {
        8: 'repeat(8, minmax(0, 1fr))',
        10: 'repeat(10, minmax(0, 1fr))',
        20: 'repeat(20, minmax(0, 1fr))',
        30: 'repeat(30, minmax(0, 1fr))',
        40: 'repeat(40, minmax(0, 1fr))',
        50: 'repeat(50, minmax(0, 1fr))',
      },
    },
  },
  plugins: [require('daisyui')],
}
