module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "hsl(210, 21%, 5%)",
        "primary-hover": "hsl(210, 21%, 12%)",
        secondary: "hsl(345, 67%, 55%)",
        "secondary-hover": "hsl(345, 67%, 45%)",
      },
      animation: {
        'ping-long': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
