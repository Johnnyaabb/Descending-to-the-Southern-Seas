/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        chaored: "#b22222",
        searoyal: "#1e3a8a",
        ricepaper: "#f5e6c8",
        ink: "#1a1a1a",
        oldgold: "#c8a951",
        seafoam: "#0e7490",
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Songti SC"', "serif"],
        sans: ['"Noto Sans SC"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        scroll: "0 0 0 1px rgba(178,34,34,0.15), 0 10px 30px -10px rgba(0,0,0,0.45)",
      },
    },
  },
  plugins: [],
};
