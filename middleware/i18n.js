// internationalization
// from https://nuxtjs.org/examples/i18n/
// docs: http://kazupon.github.io/vue-i18n/

export default function({ isHMR, app, store, route, params, error, redirect }) {
  const defaultLocale = app.i18n.fallbackLocale
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return
  // Get locale from params
  const locale = params.lang || defaultLocale
  if (store.state.locales.indexOf(locale) === -1) {
    console.log(store.state.locales, params.lang)
    return error({ message: 'This page could not be found.', statusCode: 404 })
  }
  // Set locale
  store.commit('SET_LANG', locale)
  app.i18n.locale = store.state.locale
  // News Routes have slug that can be problematic
  if (route.fullPath === '/en/news/' || route.fullPath === '/en/news') {
    return redirect('/news')
  }
}
