import i18n from '../src/i18n'
import '../src/index.css'

export const parameters = {
  i18n,
  locale: 'en',
  locales: {
    en: 'English',
    fr: 'Français',
  },
  a11y: {
    element: '#root',
    config: {},
    options: {},
    manual: true,
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'default',
    values: [
      {
        name: 'default',
        value: '#F3F4F6',
      },
    ],
  },
}

export const decorators = [(Story) => <Story />]
