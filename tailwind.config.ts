import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      keyframes: {
        glow: {
          "0%, 100%": {
            ["box-shadow"]: "0 0 20px 20px rgba(255, 0, 0, 0)",
          },
          "50%": {
            ["box-shadow"]: "0 0 20px 20px rgba(255, 0, 0, 0.5)",
          },
        },
      },
      animation: {
        glow: "glow 1s infinite",
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
      danger: "#ff0000",
    },
  },
  plugins: [],
} satisfies Config;
