<template>
  <v-container>
    <main>
      <header>
        <h1> {{ $t('page.music.title') }} </h1>
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
      client.getAssets({
        locale: 'en-US',
        order: '-sys.createdAt',
        mimetype_group: 'audio'
      })
    ])
      .then(([music]) => {
        // return data that should be available in the template
        // console.log('press', word.items[0].fields.description.lang)
        return {
          music: music.items,
        }
      })
      .catch(console.error)
  },
}
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>

