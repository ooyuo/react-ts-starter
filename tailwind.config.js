/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/shared/styles/input.css",
  ],
  theme: {
    extend: {
      spacing: {
        xs: "0.375rem",
      },
      colors: {
        black: "#171923",
        white: "#FFF",
        primary: {
          50: "#FDECF2",
          100: "#FCD9E5",
          200: "#F9B4CB",
          300: "#F68EB0",
          400: "#F36896",
          500: "#EB3D77",
          600: "#CD2864",
          700: "#AA3661",
          800: "#852447",
          900: "#630B2B",
        },
        secondary: {
          50: "#EBF8FF",
          100: "#BEE3F8",
          200: "#90CDF4",
          300: "#63B3ED",
          400: "#4299E1",
          500: "#3182CE",
          600: "#2B6CB0",
          700: "#2C5282",
          800: "#2A4365",
          900: "#1A365D",
        },
        whiteAlpha: {
          50: "rgba(255, 255, 255, 0.04)",
          100: "rgba(255, 255, 255, 0.06)",
          200: "rgba(255, 255, 255, 0.08)",
          300: "rgba(255, 255, 255, 0.16)",
          400: "rgba(255, 255, 255, 0.24)",
          500: "rgba(255, 255, 255, 0.36)",
          600: "rgba(255, 255, 255, 0.48)",
          700: "rgba(255, 255, 255, 0.64)",
          800: "rgba(255, 255, 255, 0.80)",
          900: "rgba(255, 255, 255, 0.92)",
        },
        blackAlpha: {
          50: "rgba(0, 0, 0, 0.04)",
          100: "rgba(0, 0, 0, 0.06)",
          200: "rgba(0, 0, 0, 0.08)",
          300: "rgba(0, 0, 0, 0.16)",
          400: "rgba(0, 0, 0, 0.24)",
          500: "rgba(0, 0, 0, 0.36)",
          600: "rgba(0, 0, 0, 0.48)",
          700: "rgba(0, 0, 0, 0.64)",
          800: "rgba(0, 0, 0, 0.80)",
          900: "rgba(0, 0, 0, 0.92)",
        },
        gray: {
          50: "#F7FAFC",
          100: "#EDF2F7",
          200: "#E2E8F0",
          300: "#CBD5E0",
          400: "#A0AEC0",
          500: "#718096",
          600: "#4A5568",
          700: "#2D3748",
          800: "#1A202C",
        },
        fontFamily: {
          pretendard: ["Pretendard", "sans-serif"],
        },
      },
      ".input": {
        borderRadius: "0.375rem",
        "& ::placeholder": {
          fontSize: "14px",
          fontWeight: "normal",
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".text-12-nomal": {
          "font-family": "Pretendard",
          "font-size": "0.75rem",
          "font-style": "normal",
          "font-weight": "400",
          "line-height": "133%",
        },
        ".text-12-semibold": {
          "font-family": "Pretendard",
          "font-size": "0.75rem",
          "font-style": "normal",
          "font-weight": "600",
          "line-height": "133%",
        },
        ".text-14-normal": {
          "font-family": "Pretendard",
          "font-size": "0.875rem",
          "font-style": "normal",
          "font-weight": "400",
          "line-height": "143%",
        },
        ".text-14-semibold": {
          "font-family": "Pretendard",
          "font-size": "0.875rem",
          "font-style": "normal",
          "font-weight": "600",
          "line-height": "143%",
        },
        ".text-14-medium": {
          "font-family": "Pretendard",
          "font-size": "0.875rem",
          "font-style": "normal",
          "font-weight": "500",
          "line-height": "143%",
        },
        ".text-14-bold": {
          "font-family": "Pretendard",
          "font-size": "0.875rem",
          "font-style": "normal",
          "font-weight": "700",
          "line-height": "143%",
        },
        ".text-16-medium": {
          "font-family": "Pretendard",
          "font-size": "1rem",
          "font-style": "normal",
          "font-weight": "500",
          "line-height": "150%",
        },
        ".text-20-semibold": {
          "font-family": "Pretendard",
          "font-size": "1.25rem",
          "font-style": "normal",
          "font-weight": "600",
          "line-height": "140%",
        },
        ".eclipse": {
          "overflow-hidden": "overflow-hidden",
          "whitespace-nowrap": "whitespace-nowrap",
          "text-ellipsis": "text-ellipsis",
          "break-all": "break-all",
        },
        ".flex-center": {
          display: "flex",
          "justify-content": "center",
          "align-items": "center",
        },
      });
    },
  ],
  corePlugins: {
    preflight: false,
  },
  important: true,
};
