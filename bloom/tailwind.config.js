/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // `font-display` -> Poppins (headings + body)
        display: ['Poppins', 'system-ui', 'sans-serif'],
        // `font-serif` -> Source Serif 4 (italic emphasis only)
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
