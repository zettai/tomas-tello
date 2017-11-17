<template>
  <section>
    <div>
      <logo/>
      <h1 class="title">
        nuxt-i18n-routing
      </h1>
      <h2 class="subtitle">
        Localized routing with Nuxt.js
      </h2>
      {{items}}
      <ul class="list ph2 mv0">
            <!-- <li class="item f6" v-for="item in items" :key="item.id">
                <div class="score f4">
                    {{item.score}}
                </div>
                <div class="title">
                    {{item.title}}
                    <template v-if="item.url">
                        <a class="f7" :href="item.url">{{item.url | hostname}}</a>
                    </template>
                </div>
                <div class="details">
                    <nuxt-link :to="'/user/' + item.by">{{item.by}}</nuxt-link>
                    <p class="ma0 i f7">{{item.time | timeSince}} ago</p>
                </div>
                <template v-if="item.descendants">
                    <div class="comments">
                        <nuxt-link :to="'/item/' + item.id">{{item.descendants}} comments</nuxt-link>
                    </div>
                </template>
            </li> -->
        </ul>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from "~/components/Logo.vue";
import { mapState } from "vuex";

export default {
  components: {
    Logo
  },
  computed: mapState(["items"]),
  async fetch({ store }) {
    await store.dispatch("LOAD_ITEMS", "all");
  }
};
</script>

<style>
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
