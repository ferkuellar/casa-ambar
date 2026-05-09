/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        amber: {
          black: "#17120E",
          espresso: "#2A1E17",
          gold: "#B88A44",
          softGold: "#D8B878",
          cream: "#F6EFE5",
          ivory: "#FBF7F0",
          stone: "#8C8175",
          muted: "#B8AA9A",
          line: "#E8DDCF",
        },
      },
      fontFamily: {
        heading: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        premium: "0 24px 80px rgba(23, 18, 14, 0.16)",
      },
      borderRadius: {
        brand: "6px",
      },
    },
  },
  plugins: [],
};
