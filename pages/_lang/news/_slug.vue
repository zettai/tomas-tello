<template>
  <div>
    <img
      v-if="post.fields.heroImage"
      :src="post.fields.heroImage.fields.file.url + '?fit=scale&w=350&h=196'"
      :srcset="
        `${post.fields.heroImage.fields.file.url}?w=350&h=87&fit=fill 350w, ${post.fields.heroImage.fields.file.url}?w=1000&h=250&fit=fill 1000w, ${post.fields.heroImage.fields.file.url}?w=2000&h=500&fit=fill 2000w`
      "
      size="100vw"
      :alt="post.fields.heroImage.fields.description"
    />
    <v-container>
      <time class>{{ new Date(post.fields.publishDate).toDateString() }}</time>
      <h1 class>{{ post.fields.title }}</h1>
      <vue-markdown>{{ post.fields.body }}</vue-markdown>
    </v-container>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { createClient } from '~/plugins/contentful.js'

const client = createClient()

export default {
  // Calling contentful here get specific news/blog post
  asyncData({ env, params, store }) {
    return client
      .getEntries({
        locale: store.state.locale == 'en' ? 'en-US' : store.state.locale,
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        'fields.slug': params.slug
      })
      .then(entries => {
        return {
          post: entries.items[0]
        }
      })
      .catch(console.error)
  },
  components: {
    VueMarkdown
  }
}
</script>

<style></style>
