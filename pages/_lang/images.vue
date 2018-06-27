<template>
  <v-container>
    <main>
      <v-container grid-list-sm fluid>
        <v-layout row wrap>
          <v-flex v-for="i in images" :key="i.fields.title" xs6 md2>
            <v-card flat tile>
              <v-card-media @click.stop="dialog = true" v-on:click="fullurl=i.fields.file.url" :src="i.fields.file.url + '?fm=jpg&q=30'"
                height="250px">
              </v-card-media>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <v-dialog v-model="dialog" full-width hide-overlay>
        <v-layout>
          <v-flex>
            <v-card>
              <v-layout fill-height>
                <v-flex>
                  <v-card dark>
                    <v-card-text>
                      <a v-bind:href="fullurl">
                        <img :src="fullurl" height="100%" width="100%">
                      </a>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
              <v-card-actions>
                <v-btn color="primary" flat @click.stop="dialog=false" v-on:click="fullurl=''">X</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-dialog>
    </main>
  </v-container>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export default {
  data() {
    return {
      dialog: false,
      fullurl: ''
    }
  },
  head() {
    return {
      title: this.$t('page.images.meta.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('page.images.meta.description')
        }
      ]
    }
  },
  computed: {
    images: function() {
      return this.$store.state.images
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>

