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
      },
    },
  },
  plugins: [],
};
export default config;
