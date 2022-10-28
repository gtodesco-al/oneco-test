import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStoragePlugin from 'i18next-react-native-async-storage';
import en from './en.json';

i18n
  .use(AsyncStoragePlugin())
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources: {
      en,
    },
    supportedLngs: ['en' /*, 'fr'*/],
  });

// export default i18n;
