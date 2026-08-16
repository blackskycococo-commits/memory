/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#0f1422',
        darkCard: '#182032',
        darkCardLighter: '#222c44',
        focusPink: {
          light: '#fda4af',
          DEFAULT: '#fb7185',
          dark: '#e11d48',
          glow: 'rgba(251, 113, 133, 0.35)',
        },
        breakMint: {
          light: '#6ee7b7',
          DEFAULT: '#34d399',
          dark: '#059669',
          glow: 'rgba(52, 211, 153, 0.35)',
        },
        restPurple: {
          light: '#c084fc',
          DEFAULT: '#a855f7',
          dark: '#7e22ce',
          glow: 'rgba(168, 85, 247, 0.35)',
        },
      },
      animation: {
        'bounce-soft': 'bounceSoft 2s infinite ease-in-out',
        'pulse-glow': 'pulseGlow 2.5s infinite',
        'float': 'float 3s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(2deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}
