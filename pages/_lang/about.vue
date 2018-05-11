<template>
  <v-container>
    <main>
      <header>
        <h1> {{ $t('page.about.title') }} </h1>
      </header>

      <vue-markdown>{{page.fields.body}}</vue-markdown>
    </main>
  </v-container>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import VueMarkdown from 'vue-markdown'

const client = createClient()
// var blogPosts = ['1', '2']

export default {
  components: {
    VueMarkdown
  },
  // html meta data for page
  head() {
    return {
      title: this.$t('page.about.meta.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('page.about.meta.description'),
        },
      ],
    }
  },

  // `env` is available in the context object
  asyncData({ env, store }) {
    return Promise.all([
      // fetch all blogPosts sorted by creation date
      client.getEntries({
        locale: (store.state.locale == 'en')? 'en-US':store.state.locale,
        content_type: 'page',
        order: '-sys.createdAt',
      }),
    ])
      .then(([page]) => {
        // return data that should be available in the template

        function findExactPage(item) {
          return item.fields.title === 'About Page'
        }

        var findPage = page.items.filter(findExactPage)

        return {
          page : findPage[0]
        }
      })
      .catch(console.error)
  },
}
</script>

<style scoped>

</style>

