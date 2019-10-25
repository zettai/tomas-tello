<template>
  <v-container>
    <main>
      <v-container grid-list-md fluid :key="contact">
        <v-layout row wrap>
          <v-flex d-flex xs12 sm6 md6>
            <v-card dark color="secondary">
              <v-card-text class="px-2">
                <img :src="image" height="100%" width="100%" />
                <vue-markdown>{{body}}</vue-markdown>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex d-flex xs12 sm6 md6>
            <v-card dark color="secondary">
              <v-card-text class="px-2">
                <app-h1 isBrand="true">{{ $t('page.about.contact') }}</app-h1>
                <vue-markdown>{{contact}}</vue-markdown>
                <br />
                <vue-markdown>{{message}}</vue-markdown>
              </v-card-text>
              <v-btn small @click="dialog = true">
                <v-icon>web</v-icon>
                {{$t('links.site')}}
              </v-btn>
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
              <li v-for="c in credits()" :key="c.id">
                <span v-if="c.url">
                  {{ c.comment }} (
                  <a :href="c.url" rel="nofollow" target="_blank">{{c.text}}</a> )
                </span>
                <span v-else>{{ c.comment }}</span>
              </li>
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
  computed: {
    about: function() {
      return this.$i18n.locale == 'en' ? this.$store.state.about : this.$store.state.about_es
    },
    body: function() {
      return this.about && this.about.fields && this.about.fields.body
    },
    contact: function() {
      return this.about && this.about.fields && this.about.fields.contact
    },
    image: function() {
      return this.about && this.about.fields && this.about.fields.background.fields.file.url
    },
    message: function() {
      return this.about && this.about.fields && this.about.fields.message
    }
  },
  methods: {
    credits() {
      return this.$store.state.credits
    }
  }
}
</script>

<style>
</style>

