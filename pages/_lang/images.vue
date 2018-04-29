<template>
<main>
  <header>
    <h1> {{ $t('page.images.title') }} </h1>
  </header>

  <!-- render data from contentful.com -->
  <ul>
    <li v-if="!i.fields.description" v-for="i in images" :key="i.fields.title">
       <figure>
          <a @click.stop="dialog3 = true" v-on:click="some=i.fields.file.url" ><img :src="i.fields.file.url + '?w=250'"></a>
        </figure>
      <br />
    </li>
  </ul>

  <v-dialog  v-model="dialog3" max-width="700px">
    <v-card>
      <v-card-actions>        
        <v-btn color="primary" flat @click.stop="dialog3=false" v-on:click="some=''">Close</v-btn>
      </v-card-actions>
      <v-flex class="text-xs-center">
        <figure>
          <img :src="some + '?w=600'">
        </figure>
      </v-flex>
      <br /><br />      
    </v-card>
  </v-dialog>

</main>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export default {
  data () {
    return {
      dialog3: false,
      some: ''
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

