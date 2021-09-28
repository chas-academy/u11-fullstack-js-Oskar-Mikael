module.exports = {
  purge: [
    './src/**/*.html',
    './public/index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  enabled: process.env.NODE_ENV === "production"
}
