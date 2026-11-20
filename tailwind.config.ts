import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        paper: "#F7F6F2",
        "paper-alt": "#EFECE6",
        surface: "#FFFFFF",
        dark: "#20211F",
        "dark-alt": "#181917",
        ink: "#191919",
        muted: "#66645F",
        accent: {
          DEFAULT: "#1B633E",
          dark: "#144D30",
        },
        line: {
          DEFAULT: "#DCD9D1",
          dark: "#343532",
        },
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
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "var(--font-sans)", "Inter", "sans-serif"],
        devanagari: ["var(--font-devanagari)", "Noto Serif Devanagari", "Noto Sans Devanagari", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
