import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "var(--primary-50)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
        },
        secondary: {
          50: "var(--secondary-50)",
          100: "var(--secondary-100)",
          200: "var(--secondary-200)",
          300: "var(--secondary-300)",
          500: "var(--secondary-500)",
          600: "var(--secondary-600)",
          700: "var(--secondary-700)",
          900: "var(--secondary-900)",
        },
        green: {
          50: "var(--green-50)",
          200: "var(--green-200)",
          600: "var(--green-600)",
          700: "var(--green-700)",
          800: "var(--green-800)",
        },
        red: {
          50: "var(--red-50)",
          200: "var(--red-200)",
          600: "var(--red-600)",
          700: "var(--red-700)",
          800: "var(--red-800)",
        },
        purple: {
          600: "var(--purple-600)",
          700: "var(--purple-700)",
        },
        yellow: {
          50: "var(--yellow-50)",
        },
      },
      borderRadius: {
        DEFAULT: "var(--border-radius)",
        lg: "var(--border-radius-lg)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      height: {
        nav: "var(--nav-height)",
      },
    },
  },
  plugins: [],
};

export default config;
