<template>
  <v-container>
    <main>
      <header>
        <v-card-text class="px-0">
        <h2 class="text-xs-center"> {{ $t('page.press.title') }} </h2>
        </v-card-text>
      </header>

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
  // html meta data for page
  head() {
    return {
      title: this.$t('page.press.meta.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('page.press.meta.description'),
        },
      ],
    }
  },

  // `env` is available in the context object
  asyncData({ env, store }) {
    return Promise.all([
      // fetch all entries sorted by creation date
      client.getEntries({
        locale: (store.state.locale == 'en')? 'en-US':store.state.locale,
        content_type: 'page',
        order: '-sys.createdAt',
      }),
    ])
      .then(([page]) => {
        // return data that should be available in the template
        function findExactPage(item) {
          return item.fields.title === 'Press Page'
        }

        var findPage = page.items.filter(findExactPage)
        return {
          press : findPage[0].fields.pagefiles
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

