<template>
<main>
  <header>
    <h1> {{ $t('page.video.title') }} </h1>
  </header>

  <!-- render data from contentful.com -->
  <ul>
    <li v-if="v.fields.file.contentType == 'video/mp4'" v-for="v in video" :key="v.fields.title">
      <h3>{{ v.fields.title }}</h3>
      <video width="600px" controls>
        <source :src="v.fields.file.url" type="video/mp4"> Your browser does not support the video element.
      </video>
      <br>
      <a v-bind:href="v.fields.file.url">Download</a>
      <v-icon>video</v-icon>
    </li>
  </ul>


</main>
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
          content: this.$t('page.video.meta.description'),
        },
      ],
    }
  },

  // `env` is available in the context object
  asyncData({ env, store }) {
    return Promise.all([
      client.getAssets({
        locale: 'en-US',
        order: '-sys.createdAt',
        mimetype_group: 'video'
      })
    ])
      .then(([video]) => {
        // return data that should be available in the template
        // console.log('video ', video)
        return {
          video: video.items,
        }
      })
      .catch(console.error)
  },
}
</script>

<style scoped>

</style>

