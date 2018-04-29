<template>
<main>
  <header>
    <h1> {{ $t('page.images.title') }} </h1>
  </header>

  <!-- render data from contentful.com -->
  <ul>
    <li v-if="!i.fields.description" v-for="i in images" :key="i.fields.title">
       <figure>
          <a v-bind:href="i.fields.file.url"><img :src="i.fields.file.url + '?w=250'"></a>
        </figure>
      <br />
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
      client.getAssets({
        locale: 'en-US',
        order: '-sys.createdAt',
        mimetype_group: 'image'
      })
    ])
      .then(([images]) => {
        // return data that should be available in the template
        // console.log('press', images.items[0].sys)
        return {
          images: images.items,
        }
      })
      .catch(console.error)
  },
}
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>

