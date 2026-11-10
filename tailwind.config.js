/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05040B',
          900: '#0A0817',
          800: '#120E26',
          700: '#1B1538',
          600: '#2A2150',
        },
        electric: {
          300: '#9CCBFF',
          400: '#4DA3FF',
          500: '#2F7BFF',
          600: '#1E5FE0',
        },
        violet: {
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
        },
        pink: {
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899',
        },
        mint: {
          300: '#6EE7B7',
          400: '#34D399',
        },
        amber: {
          300: '#FCD34D',
          400: '#FBBF24',
        },
        rose: {
          300: '#FDA4AF',
          400: '#FB7185',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'drift-a': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(60px, 40px, 0) scale(1.08)' },
        },
        'drift-b': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(-50px, 60px, 0) scale(0.94)' },
        },
      },
      animation: {
        'float-slow': 'drift-a 18s ease-in-out infinite',
        'float-slower': 'drift-b 24s ease-in-out infinite',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
        'glass-lg': '0 24px 64px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        glow: '0 0 32px rgba(47, 123, 255, 0.45)',
      },
    },
  },
  plugins: [],
};
