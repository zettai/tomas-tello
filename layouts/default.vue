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
      <nuxt-link v-if="$route.fullPath.split('/')[3]" class="hidden-xs-only" :to="{ 'name': 'lang-news-slug', 'params': { 'lang': reverseLocale, 'slug': morecomplexRoute }}">
        <v-btn small flat>
          <h2 class="glitch" v-if="$i18n.locale === 'en'" :data-text="$t('links.spanish')">{{ $t('links.spanish') }}
            <v-icon class="trans-icon">mdi_translate</v-icon>
          </h2>
          <h2 class="glitch" v-else :data-text="$t('links.english')">{{ $t('links.english') }}
            <v-icon class="trans-icon hidden-xs-only">mdi_translate</v-icon>
          </h2>
        </v-btn>
      </nuxt-link>

      <nuxt-link v-else :to="complexRoute">
        <v-btn small flat>
          <h2 class="glitch" v-if="$i18n.locale === 'en'" :data-text="$t('links.spanish')">{{ $t('links.spanish') }}
            <v-icon class="trans-icon">mdi_translate</v-icon>
          </h2>
          <h2 class="glitch" v-else :data-text="$t('links.english')">{{ $t('links.english') }}
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
      <span>&nbsp;&copy;2018</span>
      <span>
        <a class="contentful-logo" href="https://www.contentful.com/" rel="nofollow" target="_blank">
          <img src="https://images.ctfassets.net/fo9twyrwpveg/7Htleo27dKYua8gio8UEUy/0797152a2d2f8e41db49ecbf1ccffdaa/PoweredByContentful_DarkBackground_MonochromeLogo.svg"
            style="max-width:100px;width:100%;" alt="Powered by Contentful" />
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
        lang: this.$store.state.locale
      }
    }
  },
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: true,
      items: [
        { icon: 'apps', title: this.$t('links.home.title'), to: this.$t('links.home.url') },
        { icon: 'library_music', title: this.$t('links.music.title'), to: this.$t('links.music.url') },
        { icon: 'music_video', title: this.$t('links.video.title'), to: this.$t('links.video.url') },
        { icon: 'photo_library', title: this.$t('links.images.title'), to: this.$t('links.images.url') },
        { icon: 'picture_as_pdf', title: this.$t('links.press.title'), to: this.$t('links.press.url') },
        { icon: 'announcement', title: this.$t('links.news.title'), to: this.$t('links.news.url') },
        { icon: 'radio', title: this.$t('links.radio.title'), to: this.$t('links.radio.url') },
        { icon: 'person_pin', title: this.$t('links.about.title'), to: this.$t('links.about.url') }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Tomás Tello'
    }
  },
  created() {
    this.$store.dispatch('filterContentful', { self: this })
  },
  methods: {
    filterContentful() {
      // These 3 pages don't use localization so we can just fetch them all at the same time
      let pageTitles = ['Music Page', 'Video Page', 'Images Page']

      pageTitles.forEach(title => {
        function findExactPage(item) {
          return item.fields.title === title
        }
        switch (title) {
          case 'Music Page':
            this.$store.state.songs = this.$store.state.contentful.items.filter(findExactPage)[0].fields.pagefiles
            break
          case 'Video Page':
            this.$store.state.videos = this.$store.state.contentful.items.filter(findExactPage)[0].fields.pagefiles
            break
          case 'Images Page':
            this.$store.state.images = this.$store.state.contentful.items.filter(findExactPage)[0].fields.pagefiles
            break
        }
      })
    }
  },
  components: {
    AudioPlayer,
    SnackbarStore
  },
  computed: {
    reverseLocale: function() {
      return this.$i18n.locale == 'en' ? 'es' : 'en'
    },
    morecomplexRoute: function() {
      let slug = ''
      slug = this.$route.fullPath.split('/')[3]

      return slug
    },
    complexRoute: function() {
      let properRoute = ''
      properRoute = this.$route.fullPath

      if (this.$i18n.locale === 'en') {
        return '/es' + properRoute
      } else {
        return properRoute.replace(/^\/[^\/]+/, '')
      }
    }
  },
  watch: {
    $route() {
      Object.assign(this.$data, this.$options.data.call(this))
    }
  }
}
</script>

<style>
html {
  overflow-y: auto;
}

.toolbar__content a {
  color: transparent;
}

.contentful-logo {
  padding: 2rem;
}

.contentful-logo > img {
  width: 50%;
}
</style>
