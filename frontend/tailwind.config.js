/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1E3A8A" /* Deep corporate blue */,
          accent: "#F59E0B" /* Action orange for buttons */,
        },
      },
    },
  },
  plugins: [],
};
