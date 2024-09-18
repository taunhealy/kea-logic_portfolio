import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: "#1D4ED8",
        "primary-foreground": "#FFFFFF",
        // Define other custom colors as needed
      },
    },
  },
  plugins: [],
} satisfies Config;
