/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    darkMode: "class",
    extend: {
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
        morphingText: 'morphingText 1.5s ease-in-out infinite',
      },
      colors: {
        golden: "#FFD700",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        morphingText: {
          '0%': {
            transform: 'scale(1) rotate(0deg)',
            color: '#ffffff', 
            opacity: 0.8, 
          },
          '50%': {
            transform: 'scale(1.1) rotate(5deg)', 
            color: '#f59e0b', 
            opacity: 1, 
          },
          '100%': {
            transform: 'scale(1) rotate(0deg)', 
            color: '#ffffff',
            opacity: 0.8, 
          },
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
