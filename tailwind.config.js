/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          primary: "#F0B3AB",
          secondary: "#FFE7E7",
          heading: "#263238",
          interactive: "#EF798A",
        },
        fontFamily: {
          Inter: ["Inter", "sans-serif"],
        },
      backgroundImage: {
        hero: "url('/hero.svg')",
        featured: "url('/featured.svg')",
      },
      boxShadow: {
        glow: "4px 7px 10px rgba(255, 130, 130, 0.5)",
        glowLow: "4px 4px 5px rgba(255, 130, 130, 0.5)",
        glowHigh: "8px 8px 20px rgba(255, 130, 130, 0.8)",
      },
      dropShadow: {
        glow: "4px 7px 10px rgba(255, 130, 130, 0.5)",
        glowLow: "4px 4px 5px rgba(255, 130, 130, 0.5)",
        glowHigh: "8px 8px 20px rgba(255, 130, 130, 0.8)",
      },
      animation: {
        float: 'float 4s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%,100%': {
            transform: 'translateY(-12px)'
          },
          '50%': {
            transform: 'translateY(12px)'
          }
        }
      },
      screens: {
        "sm-md" :'902px',
      },
    },
  },
  plugins: [],
};
