import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        coal: "#070707",
        graphite: "#111214",
        steel: "#1b1d21",
        amberglow: "#f5c542",
        honey: "#ffde6a",
        ink: "#f7f7f2"
      },
      boxShadow: {
        glow: "0 0 38px rgba(245, 197, 66, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
