<template>
  <v-card flat tile>
    <v-img
      v-if="post.fields.heroImage"
      :src="post.fields.heroImage.fields.file.url + '?fit=scale&w=350&h=196'"
      height="200px"
      weight="200px"
    />
    <v-img
      v-else
      :src="'https://placeimg.com/200/200/animals'"
      height="200px"
      weight="200px"
    />
    <time class="tiny date">{{ new Date(post.fields.publishDate).toDateString() }}</time>
    <h4>
      <nuxt-link
        :to="{ name: 'lang-news-slug', params: { lang: $i18n.locale, slug: post.fields.slug } }"
        class="title"
      >{{ post.fields.title }}</nuxt-link>
    </h4>
  </v-card>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: null
    }
  }
}
</script>

<style>
</style>
