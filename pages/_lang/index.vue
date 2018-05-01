<template>
  <img class="grey darken-3" :src="page.fields.background.fields.file.url" height="100%" width="100%">
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export default {
  // html meta data for page
  head() {
    return {
      title: this.$t('page.index.meta.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('page.index.meta.description')
        }
      ]
    }
  },
  asyncData({ env, store }) {
    return Promise.all([
      // fetch all blogPosts sorted by creation date
      client.getEntries({
        content_type: 'page',
        order: '-sys.createdAt',
      }),
    ])
      .then(([page]) => {
        // return data that should be available in the template

        function findHomePage(item) {
          return item.fields.title === 'Home Page'
        }

        var foundPage = page.items.filter(findHomePage)

        return {
          page : foundPage[0]
        }
      })
      .catch(console.error)
  }
}
</script>

<style scoped>
img {
  border-style: solid;
}
</style>
