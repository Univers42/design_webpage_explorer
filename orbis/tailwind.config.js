/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // `font-grotesk` -> Anton (headings + nav)
        grotesk: ['Anton', 'system-ui', 'sans-serif'],
        // `font-condiment` -> Condiment (cursive accents)
        condiment: ['Condiment', 'cursive'],
        // `font-mono` keeps Tailwind's default monospace stack (body text)
      },
      colors: {
        space: '#010828', // deep dark navy blue background
        cream: '#EFF4FF', // off-white text
        neon: '#6FFF00', // bright green accent
      },
    },
  },
  plugins: [],
}
