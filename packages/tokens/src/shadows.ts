export const shadows = {
  // soft card shadow
  card: '0 1px 3px rgba(0,0,0,0.08)',
  cardHover: '0 4px 12px rgba(0,0,0,0.10)',
  // floating surfaces (modals, sheets)
  floating: '0 10px 30px rgba(0,0,0,0.18)',
} as const;

export type Shadow = keyof typeof shadows;
