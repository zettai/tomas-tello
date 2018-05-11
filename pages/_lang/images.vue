<template>
  <v-container>
    <main>
      <header>
        <v-card-text class="px-0">
        <h2 class="text-xs-center"> {{ $t('page.images.title') }} </h2>
        </v-card-text>
      </header>

      <v-container grid-list-sm fluid>
        <v-layout row wrap>
          <v-flex v-for="i in images" :key="i.fields.title" xs6 md2>
            <v-card flat tile>
                  <v-card-media
                    @click.stop="dialog = true"
                    v-on:click="fullurl=i.fields.file.url"
                    :src="i.fields.file.url + '?w=250'"
                    height="250px"
                  >
                  </v-card-media>
                </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <v-dialog  v-model="dialog" full-width hide-overlay>
        <v-layout>
          <v-flex >
             <v-card>
                <v-layout fill-height>
                  <v-flex >
                    <a v-bind:href="fullurl" >
                      <v-card-media :src="fullurl" height="800">
                      </v-card-media>
                    </a>
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
  data () {
    return {
      dialog: false,
      fullurl: ''
    }
  },

  // html meta data for page
  head() {
    return {
      title: this.$t('page.images.meta.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('page.images.meta.description'),
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
          return item.fields.title === 'Images Page'
        }

        var findPage = page.items.filter(findExactPage)
        return {
          images : findPage[0].fields.pagefiles
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

