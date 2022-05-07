const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    transitionDuration: {
      DEFAULT: '300ms',
    },
    extend: {
      fontFamily: {
        heading: ['Cal Sans', ...defaultTheme.fontFamily.sans],
        body: [...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        '3xl': '0 13.6301px 35.58px -6.81507px rgba(77, 71, 254, 0.36)',
        top: '0px 0px 16 0px rgba(0, 0, 0, 0.08)',
        spread: '0px 3px 80px 5px rgba(0, 0, 0, 0.05)',
      },
      transitionProperty: {
        width: 'width',
        height: 'height',
      },
      colors: {
        'gradient-blue-one': '#3A38FB',
        'gradient-blue-two': '#7471FF',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: 0,
            transform: 'translateY(100px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0px)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
