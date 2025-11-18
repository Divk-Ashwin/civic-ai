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
          DEFAULT: "#005A9C",
          50: "#E6F1F8",
          100: "#CCE3F1",
          200: "#99C7E3",
          300: "#66ABD5",
          400: "#338FC7",
          500: "#005A9C",
          600: "#00487D",
          700: "#00365E",
          800: "#00243F",
          900: "#001220",
        },
        critical: {
          DEFAULT: "#DC2626",
          50: "#FEE2E2",
          100: "#FECACA",
          200: "#FCA5A5",
          300: "#F87171",
          400: "#EF4444",
          500: "#DC2626",
          600: "#B91C1C",
          700: "#991B1B",
          800: "#7F1D1D",
          900: "#7F1D1D",
        },
        impact: {
          bronze: "#CD7F32",
          silver: "#94A3B8",
          gold: "#F59E0B",
        },
        secondary: {
          DEFAULT: "#1E293B",
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
