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
        "field-black": "#050505",
        "chrome-silver": "#E0E0E0",
        "zinc-800": "#27272a",
        "zinc-700": "#3f3f46",
        "zinc-600": "#52525b",
      },
      borderColor: {
        DEFAULT: "#27272a",
      },
      backgroundColor: {
        DEFAULT: "#050505",
      },
    },
  },
  plugins: [],
};
export default config;
