/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: {
            DEFAULT: '#0B132B',
            950: '#070C1E',
            900: '#0B132B',
            800: '#14213D',
            700: '#1C2E52',
            600: '#273E6B'
          },
          cobalt: {
            DEFAULT: '#2563EB',
            50: '#EFF6FF',
            100: '#DBEAFE',
            500: '#3B82F6',
            600: '#2563EB',
            700: '#1D4ED8',
            800: '#1E40AF',
            900: '#1E3A8A'
          },
          surface: {
            light: '#F8FAFC',
            card: '#FFFFFF',
            dark: '#0F172A',
            darkCard: '#131D38'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'premium': '0 4px 20px -2px rgba(11, 19, 43, 0.08), 0 2px 6px -2px rgba(11, 19, 43, 0.04)',
        'cobalt': '0 4px 20px -4px rgba(37, 99, 235, 0.35)',
      }
    },
  },
  plugins: [],
}
