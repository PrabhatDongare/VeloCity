/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'outer-spread': '0 0 10px 3px rgba(0, 0, 0, 0.5)',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      animation: {
        slideUp: 'slideUp 1s ease-in-out',
        slideDown: 'slideDown 100ms ease-in-out',
      },
    },
  },
  plugins: [],
}

