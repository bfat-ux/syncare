/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF51BF',
          light: '#FF7ACD',
        },
        secondary: {
          DEFAULT: '#0C555F',
          light: '#1A8A99',
        },
        white: '#FFFFFF',
      },
      fontFamily: {
        pacifico: ['Pacifico', 'cursive'],
        roboto: ['Roboto', 'sans-serif'],
      },
      keyframes: {
        'slide-in-left': {
          '0%': { 
            transform: 'translateX(-200px)',
            opacity: '0',
            filter: 'blur(5px)'
          },
          '100%': { 
            transform: 'translateX(0)',
            opacity: '1',
            filter: 'blur(0)'
          }
        },
        'slide-in-right': {
          '0%': { 
            transform: 'translateX(200px)',
            opacity: '0',
            filter: 'blur(5px)'
          },
          '100%': { 
            transform: 'translateX(0)',
            opacity: '1',
            filter: 'blur(0)'
          }
        }
      },
      animation: {
        'slide-in-left': 'slide-in-left 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slide-in-right 1s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }
    },
  },
  plugins: [],
}