<template>
  <v-container>
    <main>
      <v-container grid-list-sm fluid>
        <v-layout row wrap>
          <v-flex v-for="v in video" :key="v.fields.title">
            <v-card flat tile>
              <h3>{{ v.fields.title }}</h3>
              <client-only placeholder="Loading...">
                <youtube :video-id="v.fields.videmoLink"></youtube>
              </client-only>
              <br />
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
  </v-container>
</template>

<script>
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
.layout {
  width: min-content;
}
</style>
