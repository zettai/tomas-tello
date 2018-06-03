import Vuex from 'vuex'
import { createClient } from '~/plugins/contentful.js'

const client = createClient()
const createStore = () => {
  return new Vuex.Store({
    state: {
      sidebar: false,
      locales: ['en', 'es'],
      locale: 'en',
      playingNow: '',
      songs: [],
      snackbar: {
        color: 'primary',
        visible: false,
        text: null,
        timeout: 3000,
        multiline: false
      }
    },
    mutations: {
      showSnackbar(state, payload) {
        state.snackbar.text = payload.text
        state.snackbar.multiline = payload.text.length > 50 ? true : false

        if (payload.multiline) {
          state.snackbar.multiline = payload.multiline
        }

        if (payload.timeout) {
          state.snackbar.timeout = payload.timeout
        }

        state.snackbar.visible = true
      },
      closeSnackbar(state) {
        state.snackbar.visible = false
        state.snackbar.multiline = false
        state.snackbar.timeout = 3000
        state.snackbar.text = null
      },
      SET_LANG(state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
          state.locale = locale
        }
      },
      setSongName(state, song) {
        song ? state.playingNow = song : state.playingNow = ''
      },
      FILTER_CONTENFUL(state, songs) {
        state.songs = songs
      }
    },
    actions: {
      filterContentful({ commit }, { self }) {
        return Promise.all([
          // fetch all entries sorted by creation date
          client.getEntries({
            content_type: 'page',
            order: '-sys.createdAt'
          })
        ])
          .then(([response]) => {
            // console.log(response)
            commit('FILTER_CONTENFUL', response)
            self.filterContentful()
          })
          .catch(console.error)
      }
    }
  })
}

export default createStore
