/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./content/**/*.mdc",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        'sea-green': '#00FFC2',
        'fuschia': '#EB0066',
        'soft-lavender': '#F6EEFE',
        'touched-lavender': '#F5EDFE',
        'midnight': '#080908',
        'dark-slate': '#0C0B0C',
        'deep-indigo': '#393041',
        'midnight-slate': '#2F353D',
        'obsidian-night': '#131316',
        'soft-lilac': '#E4DDEE',
      },
      screens: {
        'xs': '512px',
        '3xl': '1792px'
      },
      keyframes: {
        blink: {
          'from, to': { opacity: '0' },
          '50%': { opacity: '1' },
        }
      },
      animation: {
        blink: 'blink 1s step-end infinite',
      }
    },
  },
  plugins: [],
}
