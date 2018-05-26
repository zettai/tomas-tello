<template>
  <v-app dark>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
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
       <nuxt-link v-if="$route.fullPath.split('/')[3]" class="hidden-xs-only" :to="{ name: 'lang-news-slug', params: { lang: reverseLocale, slug: morecomplexRoute }}">
        <v-btn small flat>
          <h2 class="glitch" v-if="$i18n.locale === 'en'" :data-text="$t('links.spanish')">{{ $t('links.spanish') }}<v-icon class="trans-icon">mdi_translate</v-icon></h2>
          <h2 class="glitch" v-else :data-text="$t('links.english')">{{ $t('links.english') }}<v-icon class="trans-icon hidden-xs-only">mdi_translate</v-icon></h2>
        </v-btn>
      </nuxt-link>

      <nuxt-link v-else :to="complexRoute">
        <v-btn small flat>
          <h2 class="glitch" v-if="$i18n.locale === 'en'" :data-text="$t('links.spanish')">{{ $t('links.spanish') }}<v-icon class="trans-icon">mdi_translate</v-icon></h2>
          <h2 class="glitch" v-else :data-text="$t('links.english')">{{ $t('links.english') }}<v-icon class="trans-icon hidden-xs-only">mdi_translate</v-icon></h2>
        </v-btn>
      </nuxt-link>
      
      <v-btn id="music-toggle"
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>volume_up</v-icon>
      </v-btn>
      <snackbar-store />
    </v-toolbar>

    <v-content>
        <nuxt />
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed

    >
      <v-list>
        <audio-player></audio-player>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
import AudioPlayer from '~/components/audio-player'
import snackbarStore from '~/components/snackbarStore'

export default {
  created() {
    this.$store.dispatch('filterContentful', { self: this })
  },
  methods: {
    filterContentful() {
      function findExactPage(item) {
        return item.fields.title === 'Music Page'
      }
      this.$store.state.songs = this.$store.state.songs.items.filter(findExactPage)[0].fields.pagefiles
    }
  },
  components: {
    AudioPlayer,
    snackbarStore
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
  head() {
    return {
      htmlAttrs: {
        // set html lang tag
        lang: this.$store.state.locale
      }
    }
  },
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        { icon: 'apps', title: this.$t('links.home.title'), to: this.$t('links.home.url') },
        { icon: 'library_music', title: this.$t('links.music.title'), to: this.$t('links.music.url') },
        { icon: 'music_video', title: this.$t('links.video.title'), to: this.$t('links.video.url') },
        { icon: 'photo_library', title: this.$t('links.images.title'), to: this.$t('links.images.url') },
        { icon: 'picture_as_pdf', title: this.$t('links.press.title'), to: this.$t('links.press.url') },
        { icon: 'announcement', title: this.$t('links.news.title'), to: this.$t('links.news.url') },
        { icon: 'person_pin', title: this.$t('links.about.title'), to: this.$t('links.about.url') }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Tomás Tello'
    }
  },
  watch: {
    $route() {
      Object.assign(this.$data, this.$options.data.call(this))
    }
  }
}
</script>

<style scoped>
.glitch {
  color: white;
  font-size: 1.2rem;
  position: relative;
  margin: 0 auto;
}

.trans-icon {
  margin-left: -80px;
}

@keyframes noise-anim {
  0% {
    clip: rect(99px, 9999px, 11px, 0);
  }
  5% {
    clip: rect(69px, 9999px, 31px, 0);
  }
  10% {
    clip: rect(82px, 9999px, 14px, 0);
  }
  15% {
    clip: rect(75px, 9999px, 75px, 0);
  }
  20% {
    clip: rect(71px, 9999px, 34px, 0);
  }
  25% {
    clip: rect(64px, 9999px, 14px, 0);
  }
  30% {
    clip: rect(39px, 9999px, 71px, 0);
  }
  35% {
    clip: rect(55px, 9999px, 88px, 0);
  }
  40% {
    clip: rect(58px, 9999px, 30px, 0);
  }
  45% {
    clip: rect(31px, 9999px, 93px, 0);
  }
  50% {
    clip: rect(71px, 9999px, 18px, 0);
  }
  55% {
    clip: rect(43px, 9999px, 35px, 0);
  }
  60% {
    clip: rect(36px, 9999px, 57px, 0);
  }
  65% {
    clip: rect(76px, 9999px, 67px, 0);
  }
  70% {
    clip: rect(46px, 9999px, 75px, 0);
  }
  75% {
    clip: rect(2px, 9999px, 75px, 0);
  }
  80% {
    clip: rect(22px, 9999px, 24px, 0);
  }
  85% {
    clip: rect(76px, 9999px, 20px, 0);
  }
  90% {
    clip: rect(28px, 9999px, 2px, 0);
  }
  95% {
    clip: rect(4px, 9999px, 75px, 0);
  }
  100% {
    clip: rect(33px, 9999px, 61px, 0);
  }
}
.glitch:after {
  content: attr(data-text);
  position: absolute;
  left: 2px;
  text-shadow: -1px 0 red;
  top: 0;
  color: white;
  background: black;
  overflow: hidden;
  clip: rect(0, 900px, 0, 0);
  animation: noise-anim 2s infinite linear alternate-reverse;
}

@keyframes noise-anim-2 {
  0% {
    clip: rect(7px, 9999px, 52px, 0);
  }
  5% {
    clip: rect(45px, 9999px, 60px, 0);
  }
  10% {
    clip: rect(73px, 9999px, 75px, 0);
  }
  15% {
    clip: rect(3px, 9999px, 67px, 0);
  }
  20% {
    clip: rect(100px, 9999px, 14px, 0);
  }
  25% {
    clip: rect(8px, 9999px, 91px, 0);
  }
  30% {
    clip: rect(40px, 9999px, 9px, 0);
  }
  35% {
    clip: rect(75px, 9999px, 35px, 0);
  }
  40% {
    clip: rect(51px, 9999px, 90px, 0);
  }
  45% {
    clip: rect(60px, 9999px, 76px, 0);
  }
  50% {
    clip: rect(65px, 9999px, 35px, 0);
  }
  55% {
    clip: rect(12px, 9999px, 100px, 0);
  }
  60% {
    clip: rect(96px, 9999px, 6px, 0);
  }
  65% {
    clip: rect(95px, 9999px, 41px, 0);
  }
  70% {
    clip: rect(74px, 9999px, 5px, 0);
  }
  75% {
    clip: rect(58px, 9999px, 69px, 0);
  }
  80% {
    clip: rect(28px, 9999px, 25px, 0);
  }
  85% {
    clip: rect(11px, 9999px, 87px, 0);
  }
  90% {
    clip: rect(19px, 9999px, 3px, 0);
  }
  95% {
    clip: rect(47px, 9999px, 49px, 0);
  }
  100% {
    clip: rect(8px, 9999px, 10px, 0);
  }
}
.glitch:before {
  content: attr(data-text);
  position: absolute;
  left: -2px;
  text-shadow: 1px 0 blue;
  top: 0;
  color: white;
  background: black;
  overflow: hidden;
  clip: rect(0, 900px, 0, 0);
  animation: noise-anim-2 3s infinite linear alternate-reverse;
}
</style>
