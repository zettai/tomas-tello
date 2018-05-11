<template>
  <v-container>
    <main>
      <header>
        <v-card-text class="px-0">
        <h2 class="text-xs-center"> {{ $t('page.about.title') }} </h2>
        </v-card-text>
      </header>

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
            <h3>{{ $t('page.about.contact') }}</h3>
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

const client = createClient()

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
        console.log('here', findPage[0].fields.background.fields.file)
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

