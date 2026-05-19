import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: "#7B1113",
        gold: "#F2C94C",
        "gold-dark": "#8A5A00",
        cream: "#FFF8EC",
        paper: "#F7F1E7",
        stone: "#E6E0D8",
        forest: "#203B2A",
        map: "#E9E1D3",
        ink: "#211A1A",
      },
      boxShadow: {
        soft: "0 20px 50px rgba(123, 17, 19, 0.12)",
      },
      fontFamily: {
        body: ["var(--font-montserrat)", "Montserrat", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-quiapo)", "Impact", "sans-serif"],
      },
      keyframes: {
        floatPlate: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(1deg)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "float-plate": "floatPlate 6s ease-in-out infinite",
        "fade-up": "fadeUp 0.55s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
