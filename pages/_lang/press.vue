<template>
  <v-container>
    <main>
      <ul>
        <li v-for="p in press" :key="p.fields.title">
          <h3>
          <v-icon v-if="p.fields.file.contentType != 'application/pdf'">description</v-icon>
          <v-icon v-else>picture_as_pdf</v-icon>
          {{ p.fields.title }} - {{p.fields.description}}</h3>
          <a v-bind:href="p.fields.file.url">Download</a>
          <br /><br />
        </li>
      </ul>
    </main>
  </v-container>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export default {
  head() {
    return {
      title: this.$t('page.press.meta.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('page.press.meta.description')
        }
      ]
    }
  },
  // Calling contentful here to avoid problems with localized data
  asyncData({ env, store }) {
    return Promise.all([
      client.getEntries({
        locale: store.state.locale == 'en' ? 'en-US' : store.state.locale,
        content_type: 'page',
        order: '-sys.createdAt'
      })
    ])
      .then(([page]) => {
        function findExactPage(item) {
          return item.fields.title === 'Press Page'
        }
        return {
          press: page.items.filter(findExactPage)[0].fields.pagefiles
        }
      })
      .catch(console.error)
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>

