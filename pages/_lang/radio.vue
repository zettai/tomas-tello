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

