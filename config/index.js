// i18n messages
const en = require('../lang/en-US')
const es = require('../lang/es-PE')
const fr = require('../lang/fr-FR')

// i18n config
const LOCALES = [
  {
    code: 'en',
    iso: 'en-US',
    name: 'English'
  },
  {
    code: 'es',
    iso: 'es-PE',
    name: 'Español'
  },
  {
    code: 'fr',
    iso: 'fr-FR',
    name: 'Français'
  }
]
const DEFAULT_LOCALE = 'en'
const I18N = {
  en,
  es,
  fr
}

// Define custom paths for localized routes
// If a route/locale is omitted, defaults to Nuxt's generated path
const ROUTES_ALIASES = {
  about: {

  },
  category: {
    fr: '/categorie',
    es: '/categoria',
    en: '/category'
  },
  'category-slug': {
    fr: '/categorie/:slug',
    es: '/categoria/:slug',
    en: '/category/:slug'
  }
}

module.exports = {
  LOCALES,
  DEFAULT_LOCALE,
  I18N,
  ROUTES_ALIASES
}
