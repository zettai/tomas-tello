<template>
    <section class="section">
    <div class="container">
    <div>
      <ul class="">
            <li class="box" v-for="(item, index) in items" :key="item.id">
                <div class="title">

                    <nuxt-link
                    :to="{ name: 'album-slug', params: { slug: index }}"
                    class="">
                    {{item.title}}
                  </nuxt-link>
                </div>
            </li>
        </ul>
    </div>
    </div>
    </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["items"])
};
</script>

<style scoped>

</style>
