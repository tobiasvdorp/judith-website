import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "primary-light": "var(--primary-light)",
        primary: "var(--primary)",
        "primary-dark": "var(--primary-dark)",
        neutral: "var(--neutral)",
        "neutral-light": "var(--neutral-light)",
        "neutral-dark": "var(--neutral-dark)",
      },

      fontFamily: {
        space: ["var(--font-space)", "sans"],
        rodetta: ["var(--font-space)", "serif"],
      },

      dropShadow: {
        text: "3px 3px 4px rgba(0, 0, 0, 1)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
