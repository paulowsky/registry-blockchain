import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

import translationEN from './locales/en.json'

// * https://www.i18next.com/overview/configuration-options
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: {
        translation: translationEN
      }
    },
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
