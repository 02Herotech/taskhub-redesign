import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "365px",
      },
      colors: {
        primary: "#381F8C",
        dark: "#1E1E1E",
        secondary: {
          orange: "#25BDD6",
          "light-blue": "#258FE6",
        },
        tc: {
          gray: "#55535A",
          orange: "#FE9B07",
        },
        status: {
          success: "#4CAF50",
          warning: {
            10: "#FFA5001A",
            100: "#F7D4C3",
            500: "#FFA500",
          },
          error: {
            "10": "#FEE4E2",
            "100": "#E98282",
          },
          information: {
            "10": "#F2F8FF",
            "100": "#17A2B8",
          },
          violet: "#C1BADB",
          lightViolet: "#EBE9F4",
          darkViolet: "#140B31",
          purpleBase: "#381F8C",
          darkpurple: "#140B31",
          "black-84": "rgba(0, 0, 0, 0.84)",
        },
        violet: {
          light: "#EBE9F4",
          normal: "#381F8C",
          dark: "#140B31",
          active: "#C1BADB",
          darkHover: "#221354",
          darker: "#140B31",
        },
        orange: {
          normal: "#FE9B07",
          light: "#FFF5E6",
        },
      },
      fontFamily: {
        satoshi: "Satoshi, sans-serif",
        satoshiMedium: "SatoshiMedium, sans-serif",
        satoshiBold: "SatoshiBold, sans-serif",
        clash: "Clash, sans-serif",
        clashMedium: "ClashMedium, sans-serif",
        clashSemiBold: "ClashSemiBold, sans-serif",
        clashBold: "ClashBold, sans-serif",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-multi":
          "linear-gradient(to bottom, #0F0826, #100927, #11092A, #130A2E, #150C35, #190E3E, #1D1048, #211253, #26155F, #2A186A, #2F1A74, #321C7D, #351D84, #371E88, #381F8B, #381F8C)",
        "404-not-found": "url('/assets/images/not-found-404.png')",
      },
    },
  },
  plugins: [],
};
export default config;
