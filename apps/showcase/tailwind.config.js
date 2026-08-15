import { airwastePreset } from '@airwaste/design-system-web/tailwind-preset';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [airwastePreset],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    // include the published package so its class names are not purged
    './node_modules/@airwaste/design-system-web/dist/**/*.js',
  ],
};
