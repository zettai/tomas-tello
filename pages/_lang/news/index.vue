<template>
  <v-container>
    <main>

      <v-container grid-list-sm fluid>
        <v-layout row wrap>
          <v-flex v-for="post in posts" :key="post.fields.id" xs6 md2>
            <article-preview :post="post"></article-preview>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
  </v-container>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import ArticlePreview from '~/components/article-preview.vue'
const client = createClient()
export default {
  asyncData({ env, params }) {
    return client
      .getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        order: '-sys.createdAt'
      })
      .then(entries => {
        return {
          posts: entries.items
        }
      })
  },
  components: {
    ArticlePreview
  }
}
</script>
