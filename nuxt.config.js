const {getConfigForKeys} = require('./lib/config.js')
const ctfConfig = getConfigForKeys([
  'CTF_BLOG_POST_TYPE_ID',
  'CTF_SPACE_ID',
  'CTF_CDA_ACCESS_TOKEN'
])
const {createClient} = require('./plugins/contentful')
const cdaClient = createClient(ctfConfig)

const config = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Tomás Tello',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Tomás Tello - Music Website / Página Oficial'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/v.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  router: {
    middleware: 'i18n'
  },
  plugins: [
    { src: '~/plugins/vue-particles.js', ssr: false },
    { src:'~/plugins/aplayer.js', ssr: false },
    '~/plugins/vuetify.js',
    '~/plugins/i18n.js',
    '~/plugins/contentful.js',
    '~/plugins/vue-js-modal.js',
    '~/plugins/global.js',
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
    routes() {
      return Promise.all([
        // get all blog posts
        cdaClient.getEntries({
          content_type: ctfConfig.CTF_BLOG_POST_TYPE_ID
        })
      ]).then(([entries]) => {
        return [
          // map entries to URLs
          ...entries.items.map(entry => `en/news/${entry.fields.slug}`),
          ...entries.items.map(entry => `/es/news/${entry.fields.slug}`),
          // yapa
          ...['/es/about']
        ]
      })

    }
  },
  env: {
    CTF_SPACE_ID: ctfConfig.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: ctfConfig.CTF_CDA_ACCESS_TOKEN,
    CTF_BLOG_POST_TYPE_ID: ctfConfig.CTF_BLOG_POST_TYPE_ID
  }
}

module.exports = config
