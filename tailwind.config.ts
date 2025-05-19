import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{ts,tsx}',
        './src/components/**/*.{ts,tsx}',
        './src/app/**/*.{ts,tsx}',
      ],
    theme: {
        extend: {
            colors: {
                primary: '#1DA1F2',
                // primary: '#0F172A',
                secondary: '#14171A',
                accent: '#657786',
                background: '#F5F8FA',
                text: '#14171A',
            },
            fontFamily: {
                sans: 'var(--font-sans)',
            },
        },
    },
    plugins: [],
};

export default config;
