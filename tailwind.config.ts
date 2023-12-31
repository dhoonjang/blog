import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      lg: '1024px',
    },
    extend: {
      fontFamily: {
        base: ['var(--font-pretendard)', 'sans-serif'],
        toss: ['var(--font-tossface)', 'var(--font-pretendard)', 'sans-serif'],
      },
      colors: {
        markdown: {
          textColor: '#c9d1d9',
        },
      },
    },
    container: {
      center: true,
      padding: '1rem',
    },
  },
  darkMode: 'class',
  plugins: [nextui(), require('@tailwindcss/container-queries')],
};

export default config;
