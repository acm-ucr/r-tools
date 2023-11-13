/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rtools: {
          "teal-100": "#C2FDFF",
          "teal-200": "#12D0D5",
          "purple-100": "#F0E3FF",
          "purple-200": "#BE8AFF",
          "orange-100": "#FFE9D8",
          "orange-200": "#FFAD6E",
          "pink-100": "#FFE0EB",
          "pink-200": "#FF8AB4",
          "yellow-100": "#FFFACC",
          "yellow-200": "#FFC700",
          "blue-100": "#9DA8DD",
          "blue-200": "#4F5480",
          "blue-300": "#41466C",
          "blue-400": "#2C3252",
          gray: "#979797",
          green: "#B3EFB9",
          black: "#1e1e1e",
        },
      },
    },
  },
  plugins: [],
};
