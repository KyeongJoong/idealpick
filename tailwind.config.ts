import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: "#4F46E5",
          indigoLight: "#EEF2FF",
          amber: "#F59E0B",
          amberLight: "#FEF3C7",
          ink: "#111827",
          gray: "#6B7280",
          bg: "#F9FAFB",
        },
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        popIn: {
          "0%": { opacity: "0", transform: "scale(0.85)" },
          "60%": { transform: "scale(1.04)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.4s ease-out",
        slideLeft: "slideLeft 0.4s ease-out",
        slideRight: "slideRight 0.4s ease-out",
        popIn: "popIn 0.5s cubic-bezier(0.18,0.89,0.32,1.28)",
      },
      boxShadow: {
        card: "0 4px 20px rgba(79,70,229,0.10)",
        hover: "0 8px 32px rgba(79,70,229,0.22)",
      },
    },
  },
  plugins: [],
};
export default config;
