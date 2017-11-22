<template>
  <section class="section">
                <div class="container">

    <nuxt-link :to="{ name: 'album' }" class="button is-link is-outlined">
      {{ $t('labels.back') }}
    </nuxt-link>

    <h2><strong>{{ $t('labels.showing_category') }}</strong> <span class="title">{{ items[routeSlug()].title }}</span></h2><br>

    <ul class="list ph2 mv0">
            <li class="item f6" v-for="(item, index) in items[routeSlug()].songs" :key="item.id">
                  {{item.title}}<br>
            <audio controls>
            <source :src="item.url" type="audio/mpeg">
            Your browser does not support the audio element.
            </audio>

            </li>
        </ul>
                </div>


  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  methods: {
    routeSlug: function() {
      return this.$route.params.slug;
    }
  },
  computed: mapState(["items"])
};
</script>

<style>

</style>
