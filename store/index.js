import data from './data.json'
import images from './images.json'
import videos from './video.json'
import articles from './press.json'

export const state = () => ({
  locales: ['en', 'fr'],
  locale: 'en',
  items: data,
  images: images,
  videos: videos,
  articles: articles
})

export const mutations = {
  SET_LANG (state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  }
}
