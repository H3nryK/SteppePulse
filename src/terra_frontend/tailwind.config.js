/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'text-shimmer': 'text-shimmer 2s infinite',
      },
      keyframes: {
        'text-shimmer': {
          '0%, 100%': { 'background-position': '-100% 0' },
          '50%': { 'background-position': '100% 0' },
        }
      }
    }
  }
};