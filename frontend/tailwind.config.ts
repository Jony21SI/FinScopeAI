import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        feijoa: {
          50: "#f4f8ed",
          100: "#e6f0d7",
          200: "#cee2b4",
          300: "#b3d28e",
          400: "#90bb60",
          500: "#739f43",
          600: "#587e32",
          700: "#44612a",
          800: "#394e26",
          900: "#324423",
          950: "#18240f",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
