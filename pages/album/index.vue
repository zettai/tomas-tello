<template>
  <section class="section">
    <div class="container">
      <div>
        <ul class="">
          <li class="box" v-for="(item, index) in items" :key="item.id">
              <nuxt-link tag="button" :to="{ name: 'album-slug', params: { slug: index }}" class="button is-primary is-outlined is-large" :disabled="item.disabled == 'true'">
                {{item.title | capitalize}} - ({{item.year}})
              </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["items"]),
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<style scoped>

</style>
