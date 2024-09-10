/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto Mono", "Mono space"],
    },
    extend: {
      screen: "100dvh",
    },
  },
  plugins: [],
};
