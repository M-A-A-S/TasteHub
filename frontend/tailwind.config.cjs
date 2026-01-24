/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"], // English font
        arabic: ["Cairo", "sans-serif"], // Arabic font
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
  variants: {
    extend: {},
  },
};
