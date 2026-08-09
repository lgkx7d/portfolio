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
        ivory: {
          DEFAULT: "#F7F5F0",
          light: "#FAF9F5",
          dark: "#EFECE6",
          accent: "#E5E1D8",
        },
        ink: {
          DEFAULT: "#111111",
          light: "#242424",
          muted: "#666666",
          subtle: "#888888",
          faint: "#CCCCCC",
        },
        terracotta: {
          DEFAULT: "#D44D35",
          bright: "#E0533C",
          soft: "#E86E58",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        sans: ["var(--font-jakarta)", "sans-serif"],
        mono: ["monospace"],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
