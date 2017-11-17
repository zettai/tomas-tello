const { generateRoutes } = require('./utils/router')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'tomas-tello',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Customize the generated output folder
  */
  generate: {
    dir: 'public',
    routes: ['/', '/about', '/fr', '/fr/about']
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['vue-i18n', 'axios']
    /*
    ** Run ESLint on save
    */
    // extend (config, ctx) {
    //   if (ctx.dev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  },
  router: {
    middleware: ['i18n'],
    extendRoutes (routes) {
      const newRoutes = generateRoutes(routes)
      routes.splice(0, routes.length)
      routes.unshift(...newRoutes)
    }
  },
  plugins: [
    { src: '~/plugins/global-mixin.js' },
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/vue-i18n.js', injectAs: 'i18n' }
  ]
}
