import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}'
      ],
    theme: {
        extend: {
            colors: {
                primary: '#1DA1F2',
                secondary: '#14171A',
                accent: '#657786',
                background: '#F5F8FA',
                text: '#14171A',
                main: "#9b5727",
                'text-primary' : '#1DA1F2'
            },
            fontFamily: {
                sans: 'var(--font-sans)',
            },
        },
    },
    plugins: [],
};

export default config;
