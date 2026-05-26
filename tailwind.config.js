/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  '#e8f4ec',
          100: '#c3dfc9',
          200: '#9ccba8',
          300: '#73b684',
          400: '#4fa265',
          500: '#2d6e47',
          600: '#1a4a2e',
          700: '#123322',
          800: '#0b1f15',
          900: '#040d09',
        },
        gold: {
          50:  '#fdf5e0',
          100: '#fae5b0',
          200: '#f7d47e',
          300: '#f3c34c',
          400: '#e8a20c',
          500: '#c8920a',
          600: '#a37108',
          700: '#7c5205',
          800: '#543503',
          900: '#2c1a01',
        },
        cream: {
          DEFAULT: '#f9f5ee',
          dark:    '#f0e9d8',
        },
        ink: {
          DEFAULT: '#12231a',
          mid:     '#2c4035',
          muted:   '#5a7060',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['"Outfit"', 'sans-serif'],
      },
      keyframes: {
        cardFloat: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        scrollWheel: {
          '0%,100%': { opacity: '1', transform: 'translate(-50%, 0)' },
          '80%':     { opacity: '0', transform: 'translate(-50%, 10px)' },
        },
        progressPulse: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0.7' },
        },
        routeDraw: {
          to: { strokeDashoffset: '0' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          from: { opacity: '0', transform: 'translateX(50px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'card-float-1': 'cardFloat 6s ease-in-out infinite',
        'card-float-2': 'cardFloat 8s ease-in-out infinite 1s',
        'card-float-3': 'cardFloat 7s ease-in-out infinite 0.5s',
        'scroll-wheel': 'scrollWheel 2s ease-in-out infinite',
        'fade-up':      'fadeUp 0.75s cubic-bezier(0.22,1,0.36,1) forwards',
        'slide-left':   'slideLeft 0.75s cubic-bezier(0.22,1,0.36,1) forwards',
        'scale-in':     'scaleIn 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
