<template>
  <section class="section">
    <div class="container">
      <nuxt-link :to="{ name: 'images' }"
                 class="button is-dark is-outlined">
        {{ $t('albums.back') }}
      </nuxt-link>
      <figure class="image">
        <img :src="images[routeSlug()].url">
      </figure>
      <!-- <div class="media-content is-pulled-right">
        <p class="subtitle is-6">{{ $t('images.by') }}: {{images[routeSlug()].author}}</p>
      </div> -->
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  methods: {
    routeSlug: function () {
      return this.$route.params.slug
    }
  },
  computed: mapState(['images']),
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<style>

</style>
