import type { Config } from 'tailwindcss';
import { brand, status, neutral, spacing, radii, shadows, fontFamily } from '@airwaste/design-tokens';

// Tailwind preset that wires AirWaste brand tokens into the theme.
// Usage in the admin app: presets: [airwastePreset] in tailwind.config.ts
export const airwastePreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        brand: brand,
        status: status,
        neutral: neutral,
      },
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
        'card-hover': shadows.cardHover,
        floating: shadows.floating,
      },
      fontFamily: {
        sans: fontFamily.web.replace(/'/g, '').split(',').map((s) => s.trim()),
      },
    },
  },
};

export default airwastePreset;
