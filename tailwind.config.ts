/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5569FF',
        secondary: '#EBEDFF',
        success: '#EA021E',
        warning: '#EA021E',
        black900: '#1C1C1E',
        black700: '#6E6D73',
        black500: '#B3B4B9',
        black300: '#E4E5EA',
        black100: '#FBFBFD',
        darkBlue500: '#33409f',
        darkBlue100: '#f7f8ff',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          scrollbarWidth: 'none',
          '-ms-overflow-style': 'none',
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none',
        },
        '.btn-default': {
          transition: 'opacity 0.25s ease-in-out',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 1,
        },
        '.btn-default:hover': {
          opacity: 0.8,
        }
      };
      addUtilities(newUtilities, ['responsive', 'hover', 'focus']);
    },
  ],
};
