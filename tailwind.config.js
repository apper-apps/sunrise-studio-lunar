/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'peach': {
          50: '#FFF7F3',
          200: '#FFE3D6'
        },
        'apricot': {
          300: '#FFC7A8'
        },
        'coral': {
          400: '#F9A89E'
        },
        'sage': {
          100: '#EAF6EE',
          400: '#8FC8A7'
        },
        'ink': {
          700: '#2E2A27'
        },
        'slate': {
          500: '#6C6A68'
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'pulse-gentle': 'pulseGentle 2s ease-in-out infinite'
      },
      keyframes: {
        fadeUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        pulseGentle: {
          '0%, 100%': {
            opacity: '1'
          },
          '50%': {
            opacity: '0.8'
          }
        }
      }
    },
  },
  plugins: [],
}