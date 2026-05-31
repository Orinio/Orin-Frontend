import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "orin-teal": "#0EA5E9",
        "orin-blue": "#3B82F6",
        "orin-magenta": "#EC4899",
        "orin-purple": "#A855F7",
        "orin-green": "#10B981",
        "orin-gold": "#F59E0B",
        "orin-bg": "#F8FAFC",
        "orin-surface": "#FFFFFF",
        "orin-surface-alt": "#F1F5F9",
        "orin-text": "#0F172A",
        "orin-text-secondary": "#64748B",
        "orin-text-tertiary": "#94A3B8",
        "orin-border": "#E2E8F0",
        "orin-border-strong": "#CBD5E1",
        danger: "#EF4444",
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
