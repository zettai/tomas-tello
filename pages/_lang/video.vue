<template>
  <v-container>
    <main>
      <v-container grid-list-sm fluid>
        <v-layout row wrap>
          <v-flex lg3 v-for="v in video" :key="v.fields.title">
            <v-card flat tile>
              <h3>{{ v.fields.title }}</h3>
              <video width="100%" controls>
                <source :src="v.fields.file.url" type="video/mp4" />Your browser does not support the video element.
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
  computed: {
    video: function() {
      return this.$store.state.videos
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>
