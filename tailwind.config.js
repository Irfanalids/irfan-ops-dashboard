/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060A14',
          900: '#0A0F1E',
          800: '#111827',
          700: '#1A2035',
          600: '#243054',
          500: '#2E3D6B',
        },
        gold: {
          300: '#F0D060',
          400: '#E8C840',
          500: '#D4AF37',
          600: '#B8960A',
        }
      }
    },
  },
  plugins: [],
}
