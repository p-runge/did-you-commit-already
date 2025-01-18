import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
    colors: {
      white: "#ffffff",
      black: "#000000",
      transparent: "transparent",
      primary: {
        // github contribution greens
        0: "#161b22", // dark
        1: "#0e4429",
        2: "#006d32",
        3: "#26a641",
        4: "#39d353", // light
      },
    },
  },
  plugins: [],
} satisfies Config;
