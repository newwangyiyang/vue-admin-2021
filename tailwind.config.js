module.exports = {
  purge: ['./src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  important: false,
  theme: {
    extend: {
      colors: {
        bb: '#000',
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
