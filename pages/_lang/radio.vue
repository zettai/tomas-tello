<template>
  <v-container>
    <main>
      <header>
        <app-h1 isBrand="true">
            {{ radio.fields.message }}
        </app-h1>
      </header>
      <v-spacer></v-spacer>
      <iframe :src="radio.fields.body" height="395px" scrolling="no" frameborder="no"></iframe>    
    </main>
  </v-container>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import h1 from '@/components/h1'

const client = createClient()

export default {
  components: {
    'app-h1': h1
  },
  // html meta data for page
  head() {
    return {
      title: this.$t('page.radio.meta.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('page.radio.meta.description')
        }
      ]
    }
  },
  // `env` is available in the context object
  asyncData({ env, store }) {
    return Promise.all([
      // fetch all entries sorted by creation date
      client.getEntries({
        locale: store.state.locale == 'en' ? 'en-US' : store.state.locale,
        content_type: 'page',
        order: '-sys.createdAt'
      })
    ])
      .then(([page]) => {
        // return data that should be available in the template
        function findExactPage(item) {
          return item.fields.title === 'Radio Page'
        }
        return {
          radio: page.items.filter(findExactPage)[0]
        }
      })
      .catch(console.error)
  }
}
</script>

<style scoped>
</style>

