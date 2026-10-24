/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cosmos: {
          950: '#030712',
          900: '#050811',
          850: '#070c1a',
          800: '#090e1f',
          750: '#0d152a',
          700: '#111827',
          600: '#1e293b',
          500: '#334155',
        },
        electric: {
          cyan: '#38bdf8',
          blue: '#0284c7',
          glow: '#00f0ff',
          deep: '#0369a1',
        },
        cyber: {
          violet: '#a855f7',
          purple: '#8b5cf6',
          deep: '#6b21a8',
          pink: '#d946ef',
        },
        matrix: {
          emerald: '#10b981',
          mint: '#34d399',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(56, 189, 248, 0.35)',
        'glow-violet': '0 0 25px -5px rgba(168, 85, 247, 0.35)',
        'glow-subtle': '0 0 15px -3px rgba(56, 189, 248, 0.15)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, rgba(56, 189, 248, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.05) 1px, transparent 1px)",
        'dots-pattern': "radial-gradient(rgba(56, 189, 248, 0.15) 1px, transparent 1px)",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scan: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        }
      }
    },
  },
  plugins: [],
}
