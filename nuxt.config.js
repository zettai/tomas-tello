module.exports = {
  head: {
    title: 'Tomas Tello',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Tomas Tello Music Site'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
  ** Include css not in components
  */
  css: [
    // node.js module but we specify the pre-processor
    { src: '~assets/main.sass', lang: 'sass' },
    { src: 'font-awesome/scss/font-awesome.scss', lang: 'scss' }
  ],
  loading: { color: 'purple' },
  build: {
    vendor: ['vue-i18n']
  },
  plugins: ['~/plugins/i18n.js'],
  generate: {
    routes: ['/album/0', '/album/1']
  }
}
