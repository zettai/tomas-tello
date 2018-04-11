const config = require('./.contentful.json')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'wip',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js + Vuetify.js project'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  router: {
    middleware: 'i18n'
  },
  plugins: [
    '~/plugins/vuetify.js',
    '~/plugins/i18n.js',
    '~/plugins/contentful.js',
    '~/plugins/vue-js-modal.js',
    '~/plugins/global.js'
  ],
  css: ['~/assets/style/app.styl'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['~/plugins/vuetify.js', 'vue-i18n']
  },
  generate: {
    routes: ['/', '/es', '/about', '/es/about'] // these routes will be pre-rendered on build
  },
  env: {
    CTF_SPACE_ID: config.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: config.CTF_CDA_ACCESS_TOKEN,
    CTF_BLOG_POST_TYPE_ID: config.CTF_BLOG_POST_TYPE_ID
  }
}
