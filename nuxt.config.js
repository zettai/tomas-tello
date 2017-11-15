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
    vendor: ['vue-i18n'],
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
    middleware: 'i18n'
  },
  plugins: ['~/plugins/i18n.js']
}
