import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import de from './de.json';
import fr from './fr.json';
import nl from './nl.json';
import tr from './tr.json';

const resources = {
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
  fr: {
    translation: fr,
  },
  nl: {
    translation: nl,
  },
  tr: {
    translation: tr,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'nl',
  debug: false,
  fallbackLng: 'nl',
  interpolation: {
    escapeValue: false,
  },
  resources,
});

export function translate(text) {
  return i18n.t(text);
}

export default i18n;
