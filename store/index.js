import data from './data.json'
import images from './images.json'

export const state = () => ({
  locales: ['en', 'fr'],
  locale: 'en',
  items: data,
  images: images
})

export const mutations = {
  SET_LANG (state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  }
}
