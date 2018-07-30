import Vuex from 'vuex'
import { createClient } from '~/plugins/contentful.js'

const client = createClient()
const createStore = () => {
  return new Vuex.Store({
    state: {
      contentful: [],
      contentful_es: [],
      images: [],
      locale: 'en',
      locales: ['en', 'es'],
      playingNow: '',
      sidebar: false,
      songs: [],
      videos: [],
      about: [],
      about_es: [],
      press: [],
      press_es: [],
      radio: [],
      radio_es: [],
      snackbar: {
        color: 'primary',
        multiline: false,
        text: null,
        timeout: 3000,
        visible: false
      },
      credits: [
        {
          comment: 'Built by Luis Salas',
          url: 'https://twitter.com/Keinesvonuns',
          text: '@keinesvonuns'
        },
        {
          comment: 'Using Nuxt',
          url: 'https://nuxtjs.org',
          text: 'nuxtjs.org'
        },
        {
          comment: 'and Vuetify',
          url: 'https://vuetifyjs.com',
          text: 'vuetifyjs.com'
        },
        {
          comment: 'Powered by Contentful',
          url: 'https://www.contentful.com',
          text: 'contentful.com'
        },
        {
          comment: 'Hosted/Deployed by Netlify',
          url: 'https://www.netlify.com',
          text: 'netlify.com'
        },
        {
          comment: 'Repo Code in GitHub',
          url: 'https://bitbucket.org',
          text: 'github.com'
        },
        {
          comment: 'And Also...',
          url: '',
          text: ''
        },
        {
          comment: 'Vue-Particles',
          url: 'https://github.com/creotip/vue-particles',
          text: 'github.com'
        },
        {
          comment: 'Glitch Pen By Lucas Bebber',
          url: 'https://codepen.io/lbebber/pen/ypgql',
          text: 'codepen.io'
        }
      ]
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
      setSongName(state, song) {
        song ? (state.playingNow = song) : (state.playingNow = '')
      },
      SET_LANG(state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
          state.locale = locale
        }
      },
      FILTER_CONTENFUL(state, response) {
        state.contentful = response
      },
      FILTER_CONTENFUL_ES(state, response) {
        state.contentful_es = response
      }
    },
    actions: {
      filterContentful({ commit }, { self }) {
        return Promise.all([
          client.getEntries({
            content_type: 'page',
            locale: 'en-US',
            order: '-sys.createdAt'
          })
        ])
          .then(([response]) => {
            commit('FILTER_CONTENFUL', response)
            self.filterContentful()
          })
          .catch(console.error)
      },
      filterContentfulES({ commit }, { self }) {
        return Promise.all([
          client.getEntries({
            content_type: 'page',
            locale: 'es',
            order: '-sys.createdAt'
          })
        ])
          .then(([response]) => {
            commit('FILTER_CONTENFUL_ES', response)
            self.filterContentfulES()
          })
          .catch(console.error)
      }
    }
  })
}

export default createStore
