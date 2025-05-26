import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        // main: "#443",
        main: "#9b5727",
        primary: '#1DA1F2',
        secondary: '#14171A',
        accent: '#657786',
        background: '#F5F8FA',
        text: '#14171A',
      },
      borderRadius: {
        custom: "95% 4% 97% 5% / 4% 94% 3% 95%",
        "custom-hover": "4% 95% 6% 95% / 95% 4% 92% 5%",
      },
      fontFamily: {
        poppins: ["'Poppins'", "sans-serif"],
        // sans: 'var(--font-sans)',
      },
      fontSize: {
        heading: "9rem",
        subheading: "3rem",
        large: "6.5rem",
        medium: "2.2rem",
        small: "1.5rem",
      },
      spacing: {
        "section-x": "9%",
      },
      boxShadow: {
        header: "0 .5rem 1rem rgba(0, 0, 0, .1)",
      },
      animation: {
        float: "float 4s linear infinite",
        aboutImage: "aboutImage 4s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0rem)" },
          "50%": { transform: "translateY(-7rem)" },
        },
        aboutImage: {
          "0%, 100%": {
            transform: "scale(.9)",
            borderRadius: "4% 95% 6% 95% / 95% 4% 92% 5%",
          },
          "50%": {
            transform: "scale(.8)",
            borderRadius: "95% 4% 97% 5% / 4% 94% 3% 95%",
          },
        },
      },
      screens: {
        '2xs': "320px",
        "xs": "425px",
        'sm': "640px",
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
};

export default config;
