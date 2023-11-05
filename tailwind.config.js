import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    // Next UI use this
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{tsx,ts,jsx,js}',
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui()],
};
