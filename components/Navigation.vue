<template>
<nav class="" role="navigation">

  <!-- language switcher -->
  <nuxt-link v-if="$i18n.locale === 'en'" :to="`/es` + $route.fullPath" active-class="none" exact>
    <a v-on:click="greet">{{ $t('links.spanish') }}</a>
  </nuxt-link>
  <nuxt-link v-else :to="$route.fullPath.replace(/^\/[^\/]+/, '')" active-class="none" exact>
    <a v-on:click="greet">{{ $t('links.english') }}</a>
  </nuxt-link>


  <ul>
    <!-- localized link to home page -->
    <li>
      <nuxt-link class="" :to="path('/')" exact>
        {{ $t('links.home') }}
      </nuxt-link>
    </li>
    <!-- localized link to about page -->
    <li>
      <nuxt-link :to="path('/about')" exact>
        {{ $t('links.about') }}
      </nuxt-link>
    </li>
  </ul>

</nav>
</template>

<style scoped>

</style>

<script>
export default {
  components: {},
  methods: {
    // return localized path for links
    path(url) {
      return this.$i18n.locale === 'en' ? url : '/' + this.$i18n.locale + url // TODO: make this a method available globally
    },
    greet: function(event) {
      window.location.reload();
    }
  }
}
</script>
