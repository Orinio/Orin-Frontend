import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orin: {
          teal: "#0EA5E9",
          blue: "#3B82F6",
          magenta: "#EC4899",
          purple: "#A855F7",
          emerald: "#10B981",
          orange: "#F59E0B",
          "bg-light": "#F8FAFC",
          "bg-dark": "#0F172A",
          "text-primary": "#0F172A",
          "text-secondary": "#64748B",
          "text-tertiary": "#94A3B8",
          "border-light": "#E2E8F0",
          "border-medium": "#CBD5E1",
        },
      },
      fontFamily: {
        display: ["var(--font-geist-sans)", "sans-serif"],
        body: ["var(--font-outfit)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        "display-1": ["48px", { lineHeight: "1.1", fontWeight: "700" }],
        "display-2": ["36px", { lineHeight: "1.2", fontWeight: "600" }],
        "display-3": ["28px", { lineHeight: "1.3", fontWeight: "600" }],
        "heading-4": ["20px", { lineHeight: "1.4", fontWeight: "600" }],
        body: ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        small: ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        tiny: ["12px", { lineHeight: "1.4", fontWeight: "500" }],
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(14, 165, 233, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(14, 165, 233, 0.6)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      boxShadow: {
        "sm-soft": "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
        "md-soft": "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
        "lg-soft": "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
        glow: "0 0 30px rgba(14, 165, 233, 0.4)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-mesh": "linear-gradient(135deg, #0EA5E9 0%, #3B82F6 25%, #EC4899 50%, #A855F7 75%, #0EA5E9 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
