import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F2',
        gold: {
          DEFAULT: '#C8A96E',
          light: '#E2CFA0',
          pale: '#F2E8D0',
        },
        charcoal: {
          DEFAULT: '#252018',
          mid: '#574E45',
          light: '#9A8D83',
        },
        earth: {
          DEFAULT: '#C6BAB0',
          dark: '#8A7D72',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        glass: '24px',
      },
      boxShadow: {
        card: '0 8px 40px rgba(37, 32, 24, 0.08)',
        'card-gold': '0 4px 24px rgba(200, 169, 110, 0.12)',
      },
      keyframes: {
        'blob-a': {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(25px,-18px) scale(1.04)' },
          '66%': { transform: 'translate(-15px,12px) scale(0.97)' },
        },
        'blob-b': {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(-20px,22px) scale(0.96)' },
          '66%': { transform: 'translate(18px,-10px) scale(1.03)' },
        },
        'blob-c': {
          '0%, 100%': { transform: 'translate(-50%,-50%) scale(1)' },
          '50%': { transform: 'translate(-50%,-50%) scale(1.08)' },
        },
        'dot-pulse': {
          '0%, 100%': { opacity: '0.25', transform: 'scale(0.75)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'blob-a': 'blob-a 18s ease-in-out infinite',
        'blob-b': 'blob-b 22s ease-in-out infinite',
        'blob-c': 'blob-c 26s ease-in-out infinite',
        'dot-pulse': 'dot-pulse 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
