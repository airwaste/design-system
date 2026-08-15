import type { Config } from 'tailwindcss';

// Tailwind preset that wires AirWaste brand tokens into the theme.
// Brand values are inlined (not imported from @airwaste/design-tokens) so the
// published web package is self-contained — the tokens package is internal and
// not published. Keep these in sync with packages/tokens/src/colors.ts etc.
const brand = {
  primary: '#15803D',
  green: '#22C55E',
  light: '#4ADE80',
  dark: '#166534',
  white: '#FFFFFF',
};
const status = {
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
};
const neutral = {
  50: '#F8FAFC',
  100: '#F1F5F9',
  200: '#E2E8F0',
  300: '#CBD5E1',
  400: '#94A3B8',
  500: '#64748B',
  600: '#475569',
  700: '#334155',
  800: '#1E293B',
  900: '#0F172A',
};
const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
};
const radii = { sm: 6, md: 10, lg: 16, xl: 24, full: 9999 };
const shadows = {
  card: '0 1px 3px rgba(0,0,0,0.08)',
  'card-hover': '0 4px 12px rgba(0,0,0,0.10)',
  floating: '0 10px 30px rgba(0,0,0,0.18)',
};

export const airwastePreset: Partial<Config> = {
  theme: {
    extend: {
      colors: { brand, status, neutral },
      spacing: Object.fromEntries(
        Object.entries(spacing).map(([k, v]) => [k, `${v}px`]),
      ),
      borderRadius: {
        sm: `${radii.sm}px`,
        md: `${radii.md}px`,
        lg: `${radii.lg}px`,
        xl: `${radii.xl}px`,
        full: '9999px',
      },
      boxShadow: {
        card: shadows.card,
        'card-hover': shadows['card-hover'],
        floating: shadows.floating,
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'Arial', 'sans-serif'],
      },
    },
  },
};

export default airwastePreset;
