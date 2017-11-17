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
    fr: '/a-propos',
    en: '/about-us',
    es: '/sobre-tomas'
  },
  category: {
    fr: '/categorie',
    es: '/albums'
  },
  'category-slug': {
    fr: '/categorie/:slug',
    es: '/albums/:slug'
  }
}

module.exports = {
  LOCALES,
  DEFAULT_LOCALE,
  I18N,
  ROUTES_ALIASES
}
