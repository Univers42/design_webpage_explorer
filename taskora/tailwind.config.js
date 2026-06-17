/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'], // italic accent: "Workflow"
        manrope: ['Manrope', 'sans-serif'], // badge + subheads
        cabin: ['Cabin', 'sans-serif'], // CTA button
        inter: ['Inter', 'sans-serif'], // dashboard + navbar
        intertight: ['"Inter Tight"', 'Inter', 'sans-serif'], // headline
      },
      colors: {
        base: '#050505',
      },
    },
  },
  plugins: [],
}
