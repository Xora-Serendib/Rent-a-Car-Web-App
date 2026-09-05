/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0a1128',
          navy: '#001f54',
          blue: '#034078',
          accent: '#1282a2',
          gold: '#f59e0b',
          'gold-light': '#fbbf24',
          'gold-dark': '#d97706',
          crimson: '#e11d48'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Montserrat', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
