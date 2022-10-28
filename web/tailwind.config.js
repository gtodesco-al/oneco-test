/* eslint-env node */
// Specifying this environment provides pre-defined global variables.
// Reference: https://eslint.org/docs/user-guide/configuring/language-options
//
// In this case, specifying eslint-env was required because "module" was not
// found as a global.
//
// I attempted changing this to a ESM and that resulted in Parcel not being
// able to find the tailwind config.
//

// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit', // enabling Just In Time Compiler engine
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      zIndex: {
        1: 1,
      },
      spacing: {
        16.2: '4.05rem',
      },
      screens: {
        tablet: { max: '1024px' },
        'tablet-sm': { max: '684px' },
        'tablet-md': '940px',
        'large-mobile': { max: '600px' },
        'small-mobile': { max: '320px' },
        mobile: { max: '768px' },
      },
      backgroundImage: {
        'sign-in-logo': "url('/assets/images/signInLogo.png')",
        'sign-in': "url('/assets/images/signIn.png')",
        'sign-in-tablet': "url('/assets/images/signInTablet.png')",
        'fortis-logo': "url('/assets/images/location-img.png')",
        folder: "url('/assets/images/folder.svg')",
        loading: "url('/assets/images/loading.svg')",
        chart: "url('/assets/images/chart.svg')",
        'amex-card': "url('/assets/images/amex-card.svg')",
        'debit-card': "url('/assets/images/debit-card.svg')",
        'diners-club-card': "url('/assets/images/diners-club-card.svg')",
        'discover-card': "url('/assets/images/discover-card.svg')",
        'jcb-card': "url('/assets/images/jcb-card.svg')",
        mastercard: "url('/assets/images/master-card.png')",
        'visa-card': "url('/assets/images/visa.png')",
        'ach-card': "url('/assets/images/ach-card.svg')",
        star: "url('/assets/images/star.svg')",
      },
      flex: {
        2: '2',
      },
      colors: {
        primary: {
          50: 'rgb(var(--color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--color-primary-900) / <alpha-value>)',
        },
        secondary: {
          50: 'rgb(var(--color-secondary-50) / <alpha-value>)',
          100: 'rgb(var(--color-secondary-100) / <alpha-value>)',
          200: 'rgb(var(--color-secondary-200) / <alpha-value>)',
          300: 'rgb(var(--color-secondary-300) / <alpha-value>)',
          400: 'rgb(var(--color-secondary-400) / <alpha-value>)',
          500: 'rgb(var(--color-secondary-500) / <alpha-value>)',
          600: 'rgb(var(--color-secondary-600) / <alpha-value>)',
          700: 'rgb(var(--color-secondary-700) / <alpha-value>)',
          800: 'rgb(var(--color-secondary-800) / <alpha-value>)',
          900: 'rgb(var(--color-secondary-900) / <alpha-value>)',
        },
        'primary-color': '#0369A1',
        'secondary-color': '#C2410C',
        'fortis-red': '#D64123',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        modals: '0 4px 16px 0 rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}
