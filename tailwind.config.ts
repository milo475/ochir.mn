import type { Config } from "tailwindcss";

/** Бүх өнгө app/globals.css-ийн токеноос уншина */
const token = (name: string) => `rgb(var(--${name}-rgb) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: token("bg"),
        surface: token("surface"),
        card: token("surface"), // хуучин нэр — surface-тэй ижил
        ink: token("ink"),
        text: token("text"),
        muted: token("muted"),
        line: token("line"),
        accent: token("accent"),
        "accent-ink": token("accent-ink"),
        "accent-strong": token("accent-strong"),
        "accent-soft": "rgb(var(--accent-rgb) / 0.15)",
        tertiary: token("tertiary"),
        canvas: token("canvas"),
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: { page: "72rem" },
    },
  },
  plugins: [],
};

export default config;
