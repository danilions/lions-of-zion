import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.zinc, // או colors.gray אם זמין
        neutral: colors.neutral,
        primary: colors.indigo,
        secondary: colors.pink,
        error: colors.rose,
        success: colors.green,
        warning: colors.yellow,
      },
    },
  },
  plugins: [],
};

export default config;