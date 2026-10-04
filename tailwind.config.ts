import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FBF8EC",
        paper2: "#F4F0E0",
        ink: "#161616",
        muted: "#5B584F",
        lime: "#C7D43F",
        line: "#D9D4BE",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        hand: ["var(--font-hand)", "cursive"],
        script: ["var(--font-script)", "cursive"],
      },
      boxShadow: {
        polaroid: "0 10px 24px -12px rgba(20,20,20,.45)",
        polaroidHover: "0 26px 44px -18px rgba(20,20,20,.55)",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        fadeUp: "fadeUp .6s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
