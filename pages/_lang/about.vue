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
          <v-btn small @click="dialog = true"><v-icon>web</v-icon>{{$t('links.site')}}</v-btn>
        </v-card>
      </v-flex>
      </v-layout>
      </v-container>

      <v-dialog v-model="dialog" max-width="400px">
          <v-card>
            <v-card-title>
              <h2>Site Credits and Info</h2>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-container>
              <ul>
                <li>Built by Luis Salas ( <a href="https://twitter.com/Keinesvonuns" rel="nofollow" target="_blank">@keinesvonuns</a> )</li>
                <li>Using Nuxt ( <a href="https://nuxtjs.org" rel="nofollow" target="_blank">nuxtjs.org</a> )</li>
                <li>and Vuetify ( <a href="https://vuetifyjs.com" rel="nofollow" target="_blank">vuetifyjs.com</a> )</li>
                <li>Powered by Contentful ( <a href="https://www.contentful.com" rel="nofollow" target="_blank">contentful.com</a> )</li>
                <li>Hosted/Deployed by Netlify ( <a href="https://www.netlify.com" rel="nofollow" target="_blank">netlify.com</a> )</li>
                <li>Repo Code in BitBucket ( <a href="https://bitbucket.org" rel="nofollow" target="_blank">bitbucket.org</a> )</li>
                <li>And Also...</li>
                <li>Vue-Particles ( <a href="https://github.com/creotip/vue-particles" rel="nofollow" target="_blank">github.com</a> )</li>
                <li>Glitch Pen By Lucas Bebber ( <a href="https://codepen.io/lbebber/pen/ypgql" rel="nofollow" target="_blank">codepen.io</a> )</li>
              </ul>
            </v-container>
            <v-card-actions>
              <v-btn color="primary" flat @click.stop="dialog=false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </main>
  </v-container>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import VueMarkdown from 'vue-markdown'
import h1 from '@/components/h1'

const client = createClient()

export default {
  data() {
    return {
      dialog: false
    }
  },
  components: {
    VueMarkdown,
    'app-h1': h1
  },
  head() {
    return {
      title: this.$t('page.about.meta.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('page.about.meta.description')
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
          return item.fields.title === 'About Page'
        }
        return {
          page: page.items.filter(findExactPage)[0]
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

