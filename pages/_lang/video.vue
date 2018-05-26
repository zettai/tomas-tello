<template>
  <v-container>
    <main>
      <header>
        <v-card-text class="px-0">
        <!-- <h2 class="text-xs-center"> {{ $t('page.video.title') }} </h2> -->
        </v-card-text>
      </header>

      <v-container grid-list-sm fluid>
        <v-layout row wrap>
          <v-flex lg3  v-for="v in video" :key="v.fields.title">            
            <v-card  flat tile>
              <h3>{{ v.fields.title }}</h3>
              <video width="100%" controls>
                <source :src="v.fields.file.url" type="video/mp4"> Your browser does not support the video element.
              </video>
              <br />
            </v-card>            
          </v-flex>          
        </v-layout>
      </v-container>

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
      title: this.$t('page.video.meta.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('page.video.meta.description')
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
          return item.fields.title === 'Video Page'
        }
        return {
          video: page.items.filter(findExactPage)[0].fields.pagefiles
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
