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
      <nuxt-link v-if="$i18n.locale === 'en'" :to="`/es` + $route.fullPath" active-class="none" exact>
        {{ $t('links.spanish') }}
      </nuxt-link>
      <nuxt-link v-else :to="$route.fullPath.replace(/^\/[^\/]+/, '')" active-class="none" exact>
        {{ $t('links.english') }}
      </nuxt-link>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <Navigation></Navigation>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import Navigation from '~/components/Navigation.vue'

export default {
  components: {
    Navigation
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
        { icon: 'person_pin', title: this.$t('links.about.title'), to: this.$t('links.about.url') }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Tomas Tello'
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
.content--wrap {
  background-color: #303030
}
</style>
