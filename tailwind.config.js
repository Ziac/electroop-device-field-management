/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fce8',
          100: '#dcf5cc',
          200: '#b8eb99',
          300: '#94e066',
          400: '#75b634', // Main brand color
          500: '#5c9229',
          600: '#2b5f0f', // Dark brand color
          700: '#234d0c',
          800: '#1a3a09',
          900: '#112706',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
    },
  },
  plugins: [],
};