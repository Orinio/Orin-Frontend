import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-teal": "#0F766E",
        "primary-teal-light": "#1B7875",
        "accent-coral": "#EA6A47",
        "accent-coral-light": "#F97316",
        "neutral-bg": "#FAFAFA",
        "neutral-surface": "#FFFFFF",
        "neutral-text": "#1F2937",
        "neutral-text-secondary": "#6B7280",
        "neutral-border": "#E5E7EB",
        success: "#10B981",
        warning: "#F59E0B",
      },
      fontFamily: {
        heading: ["Inter", "Geist", "sans-serif"],
        body: ["Outfit", "DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
};

export default config;
