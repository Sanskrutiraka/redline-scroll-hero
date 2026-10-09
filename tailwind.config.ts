import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        road: 'var(--road)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        paint: 'var(--paint)',
      },
      fontFamily: {
        display: ['var(--font-unbounded)', 'sans-serif'],
        sans: ['var(--font-instrument)', 'sans-serif'],
      },
      letterSpacing: {
        headline: '0.42em',
        label: '0.2em',
      },
      boxShadow: {
        glow: '0 0 50px var(--glow)',
      },
    },
  },
  plugins: [],
};

export default config;
