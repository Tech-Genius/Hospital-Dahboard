/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
   
        'bg-dark': '#121212',
        'surface-dark': '#1E1E1E',
        'surface-medium': '#2D2D2D',
        'primary-accent': '#267491',
        'text-light': '#E0E0E0',
        'text-muted': '#A0A0A0',
        'sidebar-active': '#262626', 
      },
    },
  },
  plugins: [],
}