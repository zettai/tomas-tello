<template>
  <v-app dark>
    <v-navigation-drawer :mini-variant.sync="miniVariant" :clipped="clipped" v-model="drawer" fixed app>
      <v-list>
        <v-list-tile router :to="item.to" :key="i" v-for="(item, i) in items" exact>
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>

      <v-spacer></v-spacer>
      <nuxt-link
        v-if="$route.fullPath.split('/')[3]"
        class="hidden-xs-only"
        :to="{
          name: 'lang-news-slug',
          params: { lang: reverseLocale, slug: morecomplexRoute },
        }"
      >
        <v-btn small flat>
          <h2 class="glitch" v-if="$i18n.locale === 'en'" :data-text="$t('links.spanish')">
            {{ $t('links.spanish') }}
            <v-icon class="trans-icon">mdi_translate</v-icon>
          </h2>
          <h2 class="glitch" v-else :data-text="$t('links.english')">
            {{ $t('links.english') }}
            <v-icon class="trans-icon hidden-xs-only">mdi_translate</v-icon>
          </h2>
        </v-btn>
      </nuxt-link>

      <nuxt-link v-else :to="complexRoute">
        <v-btn small flat>
          <h2 class="glitch" v-if="$i18n.locale === 'en'" :data-text="$t('links.spanish')">
            {{ $t('links.spanish') }}
            <v-icon class="trans-icon">mdi_translate</v-icon>
          </h2>
          <h2 class="glitch" v-else :data-text="$t('links.english')">
            {{ $t('links.english') }}
            <v-icon class="trans-icon hidden-xs-only">mdi_translate</v-icon>
          </h2>
        </v-btn>
      </nuxt-link>

      <v-btn id="music-toggle" icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>volume_up</v-icon>
      </v-btn>
      <snackbar-store />
    </v-toolbar>

    <v-content>
      <nuxt />
    </v-content>

    <v-navigation-drawer temporary :right="right" v-model="rightDrawer" fixed>
      <v-list>
        <audio-player></audio-player>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&nbsp;&copy;2021</span>
      <span>
        <a class="contentful-logo" href="https://www.contentful.com/" rel="nofollow" target="_blank">
          <img
            src="https://images.ctfassets.net/fo9twyrwpveg/7Htleo27dKYua8gio8UEUy/0797152a2d2f8e41db49ecbf1ccffdaa/PoweredByContentful_DarkBackground_MonochromeLogo.svg"
            style="width: 20%"
            alt="Powered by Contentful"
          />
        </a>
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import AudioPlayer from '~/components/audio-player'
import SnackbarStore from '~/components/snackbar-store'

export default {
  head() {
    return {
      htmlAttrs: {
        // Set html lang tag
        lang: this.$store.state.locale,
      },
    }
  },
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: true,
      items: [
        {
          icon: 'apps',
          title: this.$t('links.home.title'),
          to: this.$t('links.home.url'),
        },
        {
          icon: 'library_music',
          title: this.$t('links.music.title'),
          to: this.$t('links.music.url'),
        },
        {
          icon: 'music_video',
          title: this.$t('links.video.title'),
          to: this.$t('links.video.url'),
        },
        {
          icon: 'photo_library',
          title: this.$t('links.images.title'),
          to: this.$t('links.images.url'),
        },
        {
          icon: 'picture_as_pdf',
          title: this.$t('links.press.title'),
          to: this.$t('links.press.url'),
        },
        {
          icon: 'announcement',
          title: this.$t('links.news.title'),
          to: this.$t('links.news.url'),
        },
        {
          icon: 'radio',
          title: this.$t('links.radio.title'),
          to: this.$t('links.radio.url'),
        },
        {
          icon: 'person_pin',
          title: this.$t('links.about.title'),
          to: this.$t('links.about.url'),
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Tomás Tello',
    }
  },
  created() {
    this.$store.dispatch('filterContentful', { self: this })
    this.$store.dispatch('filterContentfulES', { self: this })
    this.$store.dispatch('filterContentfulAlbums', { self: this })
  },
  methods: {
    filterContentfulAlbums() {
      // console.log('here', this.$store.state.contentful.items)
    },
    filterContentful() {
      let pageTitles = ['Music Page', 'Vimeo Page', 'Images Page', 'Press Page', 'Radio Page', 'About Page']

      pageTitles.forEach((title) => {
        function findExactPage(item) {
          return item.fields.title === title
        }
        if (this.$store.state.contentful.items) {
          switch (title) {
            case 'Vimeo Page':
              this.$store.state.videos = this.$store.state.contentful.items.filter(findExactPage)[0].fields.vimeoLinks
              break
            case 'Images Page':
              this.$store.state.images = this.$store.state.contentful.items.filter(findExactPage)[0].fields.pagefiles
              break
            case 'Press Page':
              this.$store.state.press = this.$store.state.contentful.items.filter(findExactPage)[0].fields.pagefiles
              break
            case 'Radio Page':
              this.$store.state.radio = this.$store.state.contentful.items.filter(findExactPage)[0]
              break
            case 'About Page':
              this.$store.state.about = this.$store.state.contentful.items.filter(findExactPage)[0]
              break
          }
        }
      })
    },
    filterContentfulES() {
      let pageTitles = ['Press Page', 'Radio Page', 'About Page']

      pageTitles.forEach((title) => {
        function findExactPage(item) {
          return item.fields.title === title
        }
        if (this.$store.state.contentful_es.items) {
          switch (title) {
            case 'Press Page':
              this.$store.state.press_es = this.$store.state.contentful_es.items.filter(
                findExactPage
              )[0].fields.pagefiles
              break
            case 'Radio Page':
              this.$store.state.radio_es = this.$store.state.contentful_es.items.filter(findExactPage)[0]
              break
            case 'About Page':
              this.$store.state.about_es = this.$store.state.contentful_es.items.filter(findExactPage)[0]
              break
          }
        }
      })
    },
  },
  components: {
    AudioPlayer,
    SnackbarStore,
  },
  computed: {
    reverseLocale: function () {
      return this.$i18n.locale == 'en' ? 'es' : 'en'
    },
    morecomplexRoute: function () {
      let slug = ''
      slug = this.$route.fullPath.split('/')[3]

      return slug
    },
    complexRoute: function () {
      let properRoute = ''
      properRoute = this.$route.fullPath

      if (this.$i18n.locale === 'en') {
        return '/es' + properRoute
      } else {
        return properRoute.replace(/^\/[^/]+/, '')
      }
    },
  },
  watch: {
    $route() {
      Object.assign(this.$data, this.$options.data.call(this))
    },
  },
}
</script>

<style>
.background-container {
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}

.contentful-logo {
  padding-left: 1em;
}

.contentful-logo > img {
  width: 5em !important;
  height: auto;
}

html {
  overflow-y: auto;
}

ul {
  list-style-type: none;
}

.toolbar__content a {
  color: transparent;
}
</style>
