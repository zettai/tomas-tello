<template>
  <section class="section">
    <div class="container is-fluid">
      <div class="columns is-8 is-multiline">
        <div class="column is-one-fifth " v-for="(item, index) in images" :key="item.id">
          <figure class="image">
            <img :src="item.smallurl">
          </figure>
          <nuxt-link tag="button" :to="{ name: 'images-slug', params: { slug: index }}" class="button is-primary is-outlined is-small">
               {{ $t('images.view') }}
              </nuxt-link>
          <div class="media-content is-pulled-right">
            <p class="subtitle is-7">{{ $t('images.by') }}: {{item.author}}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["images"]),
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<style>

</style>
