// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import translationEN from '../locales/en/translation.json';
import translationUZ from '../locales/uz/translation.json';
import translationRU from '../locales/ru/translation.json';

// Retrieve language from localStorage or use the default
const storedLanguage = localStorage.getItem('language');
const defaultLanguage = storedLanguage || 'ru';

// Configure i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    uz: {
      translation: translationUZ,
    },
    ru: {
      translation: translationRU,
    },
  },
  lng: defaultLanguage,
  fallbackLng: 'uz',
  interpolation: {
    escapeValue: false,
  },
});

// Update language in localStorage when it changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;
