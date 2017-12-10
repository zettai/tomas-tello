<template>
  <section class="section">
    <div class="container">

      <nuxt-link :to="{ name: 'album' }" class="button is-dark is-outlined">
        {{ $t('albums.back') }}
      </nuxt-link>
      <br>

      <h2>
        <strong>{{ $t('albums.showing_category') }}</strong>
        <span class="title">{{ items[routeSlug()].title | capitalize}}</span>
      </h2>
      <br>

      <ul class="list ph2 mv0">
        <li class="item f6" v-for="(item, index) in items[routeSlug()].songs" :key="item.id">
          {{item.title | capitalize}}
          <br>
          <audio controls>
            <source :src="item.url" type="audio/mpeg"> Your browser does not support the audio element.
          </audio>
        </li>
      </ul>
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
  computed: mapState(['items']),
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
