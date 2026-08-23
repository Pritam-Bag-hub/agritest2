/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#166534',
          50: '#f0f7f1',
          100: '#dcede0',
          200: '#bcdcc3',
          300: '#8cc299',
          400: '#5ba370',
          500: '#38844b',
          600: '#226b37',
          700: '#1b562d',
          800: '#164526',
          900: '#10391f',
        },
        leaf: {
          DEFAULT: '#15803d',
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        earth: {
          DEFAULT: '#78350f',
          50: '#fbf5ed',
          100: '#f5e8d0',
          200: '#ead0a1',
          300: '#dcb06a',
          400: '#cf943f',
          500: '#c27c2a',
          600: '#a86324',
          700: '#864c22',
          800: '#78350f',
          900: '#5b2d0e',
        },
        amber: {
          DEFAULT: '#f59e0b',
          soft: '#fef3c7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};
