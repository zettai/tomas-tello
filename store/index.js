import { createClient } from '~/plugins/contentful.js'

const client = createClient()
export const state = () => ({
  contentful: [],
  contentful_es: [],
  images: [],
  locale: 'en',
  locales: ['en', 'es'],
  playingNow: '',
  sidebar: false,
  songs: [],
  albums: [],
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
      id: '0',
      comment: 'Built by Luis Salas',
      url: 'https://twitter.com/Keinesvonuns',
      text: '@keinesvonuns'
    },
    {
      id: '1',
      comment: 'Using Nuxt',
      url: 'https://nuxtjs.org',
      text: 'nuxtjs.org'
    },
    {
      id: '2',
      comment: 'and Vuetify',
      url: 'https://vuetifyjs.com',
      text: 'vuetifyjs.com'
    },
    {
      id: '3',
      comment: 'Powered by Contentful',
      url: 'https://www.contentful.com',
      text: 'contentful.com'
    },
    {
      id: '4',
      comment: 'Hosted/Deployed by Netlify',
      url: 'https://www.netlify.com',
      text: 'netlify.com'
    },
    {
      id: '5',
      comment: 'Repo Code in GitHub',
      url: 'https://github.com/zettai/tomas-tello',
      text: 'github.com'
    },
    {
      id: '6',
      comment: 'And Also...',
      url: '',
      text: ''
    },
    {
      id: '7',
      comment: 'Vue-Particles',
      url: 'https://github.com/creotip/vue-particles',
      text: 'github.com'
    },
    {
      id: '8',
      comment: 'Glitch Pen By Lucas Bebber',
      url: 'https://codepen.io/lbebber/pen/ypgql',
      text: 'codepen.io'
    }
  ]
})

export const mutations = {
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
  FILTER_CONTENFUL_ALBUMS(state, response) {
    state.albums = response
  },
  FILTER_CONTENFUL(state, response) {
    state.contentful = response
  },
  FILTER_CONTENFUL_ES(state, response) {
    state.contentful_es = response
  }
}

export const actions = {
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
  filterContentfulAlbums({ commit }, { self }) {
    return Promise.all([
      client.getEntries({
        content_type: 'albums',
        locale: 'en-US',
        order: '-sys.createdAt'
      })
    ])
      .then(([response]) => {
        commit('FILTER_CONTENFUL_ALBUMS', response)
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

// TODO: Fix Vuex actions/mutations to avoid doing this
export const strict = false
