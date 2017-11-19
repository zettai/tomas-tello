<template>
  <section>
<div class="Content">
    <div class="container">
    <nuxt-link :to="{ name: 'album' }" class="button--grey">
      {{ $t('labels.back') }}
    </nuxt-link>

    <h2>{{ $t('labels.showing_category') }} {{ items[routeSlug()].title }}</h2>

    <ul class="list ph2 mv0">
            <li class="item f6" v-for="(item, index) in items[routeSlug()].songs" :key="item.id">
                  {{item.title}}
            <audio controls>
            <source :src="item.url" type="audio/mpeg">
            Your browser does not support the audio element.
            </audio>

            </li>
        </ul>
    </div>
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
section {
  margin-bottom: 400px;
}
</style>
