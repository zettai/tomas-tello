<template>
  <v-container>
    <main>
      <v-container grid-list-md fluid>
      <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md6>
        <v-card dark color="secondary">
          <v-card-text class="px-2">
            <img :src="page.fields.background.fields.file.url" height="100%" width="100%">
            <vue-markdown>{{page.fields.body}}</vue-markdown>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex d-flex xs12 sm6 md6>
        <v-card dark color="secondary">
          <v-card-text class="px-2">
            <app-h1 isBrand="true">{{ $t('page.about.contact') }}</app-h1>
            <vue-markdown>{{page.fields.contact}}</vue-markdown>
            <br/>
            <vue-markdown>{{page.fields.message}}</vue-markdown>
          </v-card-text>
        </v-card>
      </v-flex>
      </v-layout>
      </v-container>
    </main>
  </v-container>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import VueMarkdown from 'vue-markdown'
import h1 from '@/components/h1';

const client = createClient()

export default {
  components: {
    VueMarkdown,
    'app-h1': h1
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
      // fetch all entries sorted by creation date
      client.getEntries({
        locale: (store.state.locale == 'en')? 'en-US':store.state.locale,
        content_type: 'page',
        order: '-sys.createdAt',
      })
    ])
      .then(([page]) => {
        // return data that should be available in the template

        function findExactPage(item) {
          return item.fields.title === 'About Page'
        }
        return {
          page : page.items.filter(findExactPage)[0]
        }
      })
      .catch(console.error)
  }
}
</script>

<style scoped>

</style>

