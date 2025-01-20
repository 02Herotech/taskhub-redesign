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
        "image-gradient":
          "linear-gradient(0deg, rgba(227, 220, 251, 0.95) 22.22%, rgba(185, 179, 207, 0.3) 63.39%, rgba(198, 196, 202, 0) 82.21%)",
        "bar-gradient":
          "linear-gradient(180deg, rgba(20, 11, 49, 0.5) 0%, rgba(22, 13, 51, 0.5) 6.67%, rgba(28, 19, 56, 0.5) 13.33%, rgba(37, 29, 65, 0.5) 20%, rgba(51, 43, 78, 0.5) 26.67%, rgba(69, 62, 94, 0.5) 33.33%, rgba(91, 84, 114, 0.5) 40%, rgba(114, 108, 135, 0.5) 46.67%, rgba(139, 133, 158, 0.5) 53.33%, rgba(162, 157, 179, 0.5) 60%, rgba(184, 179, 199, 0.5) 66.67%, rgba(202, 197, 215, 0.5) 73.33%, rgba(216, 212, 228, 0.5) 80%, rgba(225, 222, 237, 0.5) 86.67%, rgba(231, 228, 242, 0.5) 93.33%, rgba(233, 230, 244, 0.5) 97.08%)",
        "mobile-bar-gradient":
          "linear-gradient(90deg, rgba(20, 11, 49, 0.5) 0%, rgba(22, 13, 51, 0.5) 6.67%, rgba(28, 19, 56, 0.5) 13.33%, rgba(37, 29, 65, 0.5) 20%, rgba(51, 43, 78, 0.5) 26.67%, rgba(69, 62, 94, 0.5) 33.33%, rgba(91, 84, 114, 0.5) 40%, rgba(114, 108, 135, 0.5) 46.67%, rgba(139, 133, 158, 0.5) 53.33%, rgba(162, 157, 179, 0.5) 60%, rgba(184, 179, 199, 0.5) 66.67%, rgba(202, 197, 215, 0.5) 73.33%, rgba(216, 212, 228, 0.5) 80%, rgba(225, 222, 237, 0.5) 86.67%, rgba(231, 228, 242, 0.5) 93.33%, rgba(233, 230, 244, 0.5) 97.08%)",
        "blue-black":
          "linear-gradient(180deg, #0F0826 0%, #100927 6.67%, #11092A 13.33%, #130A2E 20%, #150C35 26.67%, #190E3E 33.33%, #1D1048 40%, #211253 46.67%, #26155F 53.33%, #2A186A 60%, #2F1A74 66.67%, #321C7D 73.33%, #351D84 80%, #371E88 86.67%, #381F8B 93.33%, #381F8C 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
