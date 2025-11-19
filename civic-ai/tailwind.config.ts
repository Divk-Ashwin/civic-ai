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
        // 1. The Core Brand Colors
        primary: {
          DEFAULT: "#005A9C", // Civic Blue
          foreground: "#FFFFFF", // Fixes invisible text on buttons!
          50: "#E6F1F8",
          100: "#CCE3F1",
          500: "#005A9C",
          600: "#00487D",
          700: "#00365E",
          900: "#001220",
        },
        secondary: {
          DEFAULT: "#1E293B",
          foreground: "#FFFFFF",
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          500: "#64748B",
          800: "#1E293B",
          900: "#0F172A",
        },
        // 2. Critical / Error States
        destructive: {
          DEFAULT: "#DC2626",
          foreground: "#FFFFFF",
        },
        critical: {
          DEFAULT: "#DC2626",
          500: "#DC2626",
        },
        // 3. Impact / Badge Colors
        impact: {
          bronze: "#CD7F32",
          silver: "#94A3B8",
          gold: "#F59E0B",
        },
        // 4. Standard UI Colors (Fixes text and borders on cards/inputs)
        background: "#F8FAFC",
        foreground: "#0F172A", // Main text color
        muted: {
          DEFAULT: "#F1F5F9",
          foreground: "#64748B",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#0F172A",
        },
        border: "#E2E8F0",
        input: "#E2E8F0",
        ring: "#005A9C",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
