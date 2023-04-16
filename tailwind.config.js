/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        custom: 'repeat(3, 1fr) 5fr',
        custom2: 'repeat(19, 1fr) 8fr',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      colors: {
        end: '#588F44',
        start: '#7ED321',
        path: '#eab308',
      },
    },
  },
  plugins: [],
};
