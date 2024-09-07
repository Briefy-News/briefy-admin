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
        },
        '.label-default': {
          height: '20px',
          padding: '0 7px 0 7px',
          fontWeight: 'bold',
          fontSize: '0.625rem',
          borderRadius: '4px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        '.input-label': {
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '3px',
          color: '#1C1C1E'
        },
        '.input-label-default': {
          color: '#413F56',
          fontSize: '0.9375rem',
          lineHeight: '23px',
          display: 'inline-block',
        },
        '.input-default': {
          width: '100%',
          height: '42px',
          color: '#101C33',
          fontSize: '0.875rem',
          fontWeight: '400',
          border: '1px solid #DBDEE2',
          borderRadius: '5px',
          paddingLeft: '18px',
          transition: 'border 0.25s ease-in-out',
        },
        '.input-default::placeholder': {
          color: '#AAB1BC',
        },
        '.input-default:focus': {
          outline: 'none',
          borderColor: '#8E94A0',
        },
        '.error-txt': {
          color: '#DC2626',
          fontSize: '0.8rem',
          fontWeight: '400',
          leading: '23px',
          marginTop: '7px',
        },
        '.blue-btn': {
          color: 'white',
          backgroundColor: '#5569FF',
          fontSize: '0.875rem',
          fontWeight: 400,
          height: '48px',
          borderRadius: '12px',
          width: '100%',
        },
        '.textarea-default': {
          width: '100%',
          height: '200px',
          color: '#101C33',
          fontSize: '0.875rem',
          fontWeight: '400',
          border: '1px solid #DBDEE2',
          borderRadius: '5px',
          padding: '15px',
          transition: 'border 0.25s ease-in-out',
        },
        '.textarea-default::placeholder': {
          color: '#AAB1BC',
        },
        '.textarea-default:focus': {
          outline: 'none',
          borderColor: '#8E94A0',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover', 'focus']);
    },
  ],
};
