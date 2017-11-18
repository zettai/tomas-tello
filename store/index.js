import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
// import axios from '~/plugins/axios'
import data from './data.json'
import i18n from './i18n'

const debug = process.env.NODE_ENV !== 'production'

// Common plugins for store
let plugins = []
if (debug) {
  // Dev plugins
  const devPlugins = []
  if (process.browser) {
    devPlugins.push(createLogger())
  }
  plugins = devPlugins
} else {
  // Prod plugins
  plugins = plugins.concat([])
}

const store = () => new Vuex.Store({
  modules: {
    i18n
  },
  state: {
    items: data
  },
  actions: {
    /**
     * Action triggered on server served pages (first load)
     * @param  {Function} options.dispatch  Dispatch method
     * @param  {Object} options.req         Request object
     * @return {void}
     */

    async nuxtServerInit ({ commit }) {
      // const response = await axios.get()
      // const items = response.data[0].albums
      const items = data[0].albums
      commit('setItems', items)
    }
  },

  mutations: {
    setItems (state, items) {
      state.items = items
    }
  },
  plugins
})

export default store
