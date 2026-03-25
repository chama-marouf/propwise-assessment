import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Fonts ───────────────────────────────────────────────────────────────
      fontFamily: {
        sans: ['Figtree', 'var(--font-figtree)', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },

      // ─── Font Sizes (from Typography page) ───────────────────────────────────
      fontSize: {
        'display-1': ['28px', { lineHeight: '36px', fontWeight: '700' }],
        'display-2': ['24px', { lineHeight: '32px', fontWeight: '700' }],
        'display-3': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '24px' }],
        'body': ['14px', { lineHeight: '20px' }],
        'body-sm': ['12px', { lineHeight: '16px' }],
        'caption': ['10px', { lineHeight: '14px' }],
      },

      // ─── Colors ───────────────────────────────────────────────────────────────
      colors: {
        // Brand (PropWise — custom, not standard Tailwind)
        brand: {
          50:  '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#3D52D5', // brand-500: primary blue
          600: '#2F3FB8',
          700: '#2B3899',
          800: '#1E2A7A',
          900: '#131A55',
        },

        // Gray (light mode neutral — modified Tailwind values)
        gray: {
          50:  '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D1D1D6',
          400: '#A0A0AB',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
        },

        // Stone (dark mode neutral — modified Tailwind values)
        stone: {
          50:  '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },

        // Tailwind semantic colors
        red: {
          50:  '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#FF485D',
          600: '#E11D48',
          700: '#BE123C',
          800: '#9F1239',
          900: '#881337',
        },
        green: {
          50:  '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        orange: {
          50:  '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        blue: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        purple: {
          50:  '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
          700: '#7E22CE',
          800: '#6B21A8',
          900: '#581C87',
        },
      },

      // ─── Shadows (from Shadows page) ─────────────────────────────────────────
      boxShadow: {
        'xs':       '0 1px 2px 0 rgba(0,0,0,0.04)',
        'sm':       '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'modal':    '0 8px 24px -4px rgba(0,0,0,0.10), 0 2px 8px -2px rgba(0,0,0,0.06)',
        'dropdown': '0 4px 12px -2px rgba(0,0,0,0.08), 0 1px 4px -1px rgba(0,0,0,0.04)',
        'card':     '0 1px 3px 0 rgba(0,0,0,0.05), 0 1px 2px -1px rgba(0,0,0,0.03)',
        'card-hover': '0 4px 12px -2px rgba(0,0,0,0.08), 0 1px 4px -1px rgba(0,0,0,0.04)',
      },

      // ─── Border Radius ────────────────────────────────────────────────────────
      borderRadius: {
        'none':  '0px',
        'sm':    '4px',
        'DEFAULT':'6px',
        'md':    '8px',
        'lg':    '10px',
        'xl':    '12px',
        '2xl':   '16px',
        '3xl':   '20px',
        'full':  '9999px',
      },

      // ─── Spacing ──────────────────────────────────────────────────────────────
      spacing: {
        '4.5': '18px',
        '13':  '52px',
        '15':  '60px',
        '18':  '72px',
        '56':  '224px', // Sidebar width
      },

      // ─── Width ────────────────────────────────────────────────────────────────
      width: {
        'sidebar': '224px',
      },

      // ─── Screens (from Breakpoints page) ─────────────────────────────────────
      screens: {
        'xs':  '380px',  // Mobile S
        'sm':  '640px',
        'md':  '744px',  // Tablet S
        'lg':  '834px',  // Tablet M
        'xl':  '1280px', // Desktop S
        '2xl': '1440px', // Desktop M
        '3xl': '1680px', // Desktop L
        '4xl': '2000px', // Desktop XL
      },

      // ─── Animation ────────────────────────────────────────────────────────────
      keyframes: {
        'slide-in-right': {
          '0%':   { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)',    opacity: '1' },
        },
        'slide-out-right': {
          '0%':   { transform: 'translateX(0)',    opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'count-up': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bar-grow': {
          '0%':   { width: '0%' },
          '100%': { width: 'var(--bar-width)' },
        },
      },
      animation: {
        'slide-in-right':  'slide-in-right 0.25s cubic-bezier(0.16,1,0.3,1)',
        'slide-out-right': 'slide-out-right 0.2s ease-in',
        'fade-in':         'fade-in 0.3s ease-out',
        'count-up':        'count-up 0.5s ease-out',
        'bar-grow':        'bar-grow 0.7s cubic-bezier(0.16,1,0.3,1)',
      },
    },
  },
  plugins: [],
};

export default config;
