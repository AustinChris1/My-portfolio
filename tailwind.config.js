/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ['Sora', 'system-ui', 'sans-serif'],
        display: ['Syne', 'Sora', 'system-ui', 'sans-serif'],
        sans: ['Sora', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#050505',
          900: '#0a0a0c',
          800: '#101015',
          700: '#1a1a22',
        },
        accent: {
          lime: '#c8ff3e',
          mint: '#a6ffcb',
          sky: '#7dd3fc',
        },
      },
      letterSpacing: {
        widest2: '0.22em',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
    },
  },
  plugins: [],
}
