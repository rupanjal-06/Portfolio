/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#0B1622', // base background — deep winter night
        frost: '#13233A', // raised panels / section bands
        ice: '#9FD8EA', // primary cold accent
        snowlight: '#E8F6FF', // near-white highlight, headline text
        lantern: '#FFD166', // warm footer-light accent, the one warm note
        mute: '#7E93AA', // secondary/body text on dark
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-6px) translateX(4px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px 2px rgba(255,209,102,0.30)' },
          '50%': { boxShadow: '0 0 22px 7px rgba(255,209,102,0.65)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        bearShake: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1.05)' },
          '25%': { transform: 'rotate(-3deg) scale(1.05)' },
          '75%': { transform: 'rotate(3deg) scale(1.05)' },
        },
      },
      animation: {
        drift: 'drift 4.5s ease-in-out infinite',
        glowPulse: 'glowPulse 2.6s ease-in-out infinite',
        fadeUp: 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
        shimmer: 'shimmer 3s linear infinite',
        bearShake: 'bearShake 0.5s ease-in-out',
      },
      boxShadow: {
        frosted: '0 8px 32px 0 rgba(6, 14, 24, 0.55)',
      },
    },
  },
  plugins: [],
}
