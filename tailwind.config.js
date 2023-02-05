/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'forest',
    themes: ['forest'],
  },
  plugins: [require('daisyui')],
};
