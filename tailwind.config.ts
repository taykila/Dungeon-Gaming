import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Core surfaces
        void: "#090909", // primary background
        surface: "#151515", // secondary background
        card: "#1D1D1D", // card background
        line: "#2A2A2A", // hairline borders on dark surfaces

        // Brand accent — deep crimson red
        crimson: {
          DEFAULT: "#B31217",
          50: "#FDECEC",
          100: "#F8C9CA",
          200: "#EE9A9C",
          300: "#E2696C",
          400: "#D33F43",
          500: "#B31217",
          600: "#8F0E12",
          700: "#6B0A0D",
          800: "#4A0709",
          900: "#2C0405",
        },

        ink: {
          DEFAULT: "#F5F5F5", // primary text on dark
          muted: "#A0A0A0", // secondary text
          faint: "#6B6B6B", // tertiary / disabled text
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 6vw, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 4.5vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        lg: "12px",
        xl: "16px",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(179, 18, 23, 0.45)",
        "glow-sm": "0 0 20px -6px rgba(179, 18, 23, 0.5)",
        card: "0 4px 24px -8px rgba(0, 0, 0, 0.6)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1.25rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
        },
      },
    },
  },
  plugins: [],
};

export default config;
