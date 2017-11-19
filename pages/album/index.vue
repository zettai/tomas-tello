<template>
  <section>
    <div class="Content">
    <div class="container">
    <h2>{{ $t('labels.select_category') }}</h2>
    <div>
      <ul class="list ph2 mv0">
            <li class="album" v-for="(item, index) in items" :key="item.id">
                <div class="title">

                    <nuxt-link
                    :to="{ name: 'album-slug', params: { slug: index }}"
                    class="button--green">
                    {{item.title}}
                  </nuxt-link>
                </div>
            </li>
        </ul>
    </div>
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