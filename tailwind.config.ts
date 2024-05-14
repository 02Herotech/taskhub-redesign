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
        primary: "#381F8C",
        dark: "#1E1E1E",
        secondary: {
          orange: "#25BDD6",
          "light-blue": "#258FE6",
        },
        tc: {
          gray: "#55535A"
        },
        status: {
          success: {
            "10": "#F3FEF3",
            "100": "#008000",
          },
          warning: {
            10: "#FFA5001A",
            100: "#F7D4C3",
            500: "#FFA500",
          },
          error: {
            "10": "#FEE4E2",
            "100": "#FF0000",
          },
          information: {
            "10": "#F2F8FF",
            "100": "#17A2B8",
          },
        },
      },
      fontFamily: {
        clashDisplay: ["var(----font-clashDisplay)"],
        satoshi: ["var(----font-satoshi)"],
      },
    },
  },
  plugins: [],
};
export default config;
