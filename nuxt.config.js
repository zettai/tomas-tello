module.exports = {
  head: {
    title: 'Tomas Tello',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Tomas Tello Music Site' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: 'cyan' },
  build: {
    vendor: ['vue-i18n']
  },
  plugins: ['~/plugins/i18n.js'],
  generate: {
    routes: ['/', '/about']
  }
}
