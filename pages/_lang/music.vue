<template>
  <v-container>
    <main>
      <header>
        <v-card-text class="px-0">
        <h2 class="text-xs-center"> {{ $t('page.music.title') }} </h2>
        </v-card-text>
      </header>

      <ul>
        <li v-for="m in music" :key="m.fields.title">
          <h3>{{ m.fields.title }}</h3>
          <audio controls>
            <source :src="m.fields.file.url" type="audio/mpeg"> Your browser does not support the audio element.
          </audio>
          <br />
          <a v-bind:href="m.fields.file.url">Download</a>
          <v-icon>music</v-icon>
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
      title: this.$t('page.music.meta.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('page.music.meta.description'),
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
          return item.fields.title === 'Music Page'
        }

        var findPage = page.items.filter(findExactPage)
        return {
          music : findPage[0].fields.pagefiles
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

