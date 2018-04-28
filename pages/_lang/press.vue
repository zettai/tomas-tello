<template>
<main>
  <header>
    <h1> {{ $t('page.about.title') }} </h1>
  </header>

  <!-- render data from contentful.com -->
  <ul>
    <li v-for="p in press" :key="p.fields.title">
      <h3>{{ p.fields.title }}</h3>
      <a v-bind:href="p.fields.file.url">Download</a>
      <v-icon v-if="p.fields.file.contentType != 'application/pdf'">description</v-icon>
      <v-icon v-else>picture_as_pdf</v-icon>
    </li>
  </ul>


</main>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export default {
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
      client.getAssets({
        locale: (store.state.locale == 'en')? 'en-US':store.state.locale,
        order: '-sys.createdAt',
        mimetype_group: 'richtext'
      }),
      client.getAssets({
        locale: (store.state.locale == 'en')? 'en-US':store.state.locale,
        order: '-sys.createdAt',
        mimetype_group: 'pdfdocument'
      })
    ])
      .then(([word, pdf]) => {
        // return data that should be available in the template
        // console.log('press', word.items[0].fields.file)
        return {
          press: word.items.concat(pdf.items),
        }
      })
      .catch(console.error)
  },
}
</script>

<style scoped>

</style>

