import data from './data.json'

export const state = () => ({
  locales: ['en', 'fr'],
  locale: 'en',
  items: data[0].albums
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  }
}
