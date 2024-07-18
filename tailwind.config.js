/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      screens:{
        'sm95': '950px',
        'sm54': '540px',
        'sm48': '480px',
      }
    },
  },
  plugins: [],
}

