import delve from 'dlv';
import en from './translations/en.json';

const i18n = {
  defaultLanguage: 'en',
  fallbackLanguage: 'en',
  dictionaries: { en },
  setDefaultLanguage(lng, fallback) {
    i18n.defaultLanguage = lng;
    if (fallback) i18n.fallbackLanguage = fallback;
  },
  t(key) {
    let translation;

    if (
      Object.prototype.hasOwnProperty.call(
        i18n.dictionaries,
        i18n.defaultLanguage
      )
    ) {
      translation = delve(i18n.dictionaries[i18n.defaultLanguage], key);
      if (translation) return translation;
    }

    if (
      Object.prototype.hasOwnProperty.call(
        i18n.dictionaries,
        i18n.fallbackLanguage
      )
    ) {
      translation = delve(i18n.dictionaries[i18n.fallbackLanguage], key);
      if (translation) return translation;
    }

    return `Not found: ${key}`;
  },
};

export default i18n;
