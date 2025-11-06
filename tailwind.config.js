/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F5F5F5",
          100: "#EBEBEB",
          200: "#D6D6D6",
          300: "#C2C2C2",
          400: "#ADADAD",
          500: "#999999",
          600: "#666666",
          700: "#4D4D4D",
          800: "#333333",
          900: "#1A1A1A",
          950: "#0D0D0D",
        },
        secondary: {
          50: "#F7F7F7",
          100: "#E6E6E6",
          200: "#CCCCCC",
          300: "#B3B3B3",
          400: "#999999",
          500: "#808080",
          600: "#666666",
          700: "#4D4D4D",
          800: "#333333",
          900: "#1A1A1A",
          950: "#0D0D0D",
        },
        accent: {
          50: "#F2F2F2",
          100: "#E6E6E6",
          200: "#CCCCCC",
          300: "#B3B3B3",
          400: "#999999",
          500: "#808080",
          600: "#666666",
          700: "#4D4D4D",
          800: "#333333",
          900: "#1A1A1A",
          950: "#0D0D0D",
        },
        text: {
          primary: "#1A1A1A",
          secondary: "#4A4A4A",
          light: "#717171",
        },
      },
      fontFamily: {
        sans: [
          "Franklin Gothic Medium",
          "Franklin Gothic",
          "ITC Franklin Gothic",
          "Arial",
          "sans-serif",
        ],
      },
      spacing: {
        128: "32rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      keyframes: {
        scrollX: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "scroll-x-alternate": "scrollX 6s linear infinite alternate",
      },
    },
  },
  plugins: [],
};
