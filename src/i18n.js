import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import tr from './lang/tr.json';
import en from './lang/en.json';

const savedLanguage = (() => {
  try {
    return localStorage.getItem('language');
  } catch {
    return null;
  }
})();

i18n.use(initReactI18next).init({
  resources: {
    tr: { translation: tr },
    en: { translation: en },
  },
  lng: savedLanguage === 'en' ? 'en' : 'tr',
  fallbackLng: 'tr',
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  try {
    localStorage.setItem('language', lng);
  } catch {
    // ignore
  }
});

document.documentElement.lang = i18n.language;

export default i18n;
