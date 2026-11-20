import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        legal: {
          50: "#f2f7f4",
          100: "#e1ede6",
          200: "#c4dbcf",
          300: "#9ec2b1",
          400: "#74a48f",
          500: "#518770",
          600: "#3d6c58",
          700: "#325747",
          800: "#1b3a2f", // Deep green accent
          900: "#132b23",
          950: "#091712",
        },
        gold: {
          500: "#c5a880",
          600: "#b09166",
        }
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
} satisfies Config;
