<template>
  <v-container>
    <main>
      <ul>
        <li v-for="p in radio()" :key="p.id">
          <app-h1 isBrand="true" v-if="p.message">
            {{p.message}}
          </app-h1>
          <v-spacer></v-spacer>
          <iframe v-if="p.body" :src="p.body" height="395px" scrolling="no" frameborder="no"></iframe>
        </li>
      </ul>
    </main>
  </v-container>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import h1 from '@/components/h1'

const client = createClient()

export default {
  components: {
    'app-h1': h1
  },
  head() {
    return {
      title: this.$t('page.radio.meta.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('page.radio.meta.description')
        }
      ]
    }
  },
  methods: {
    radio() {
      return this.$i18n.locale == 'en' ? this.$store.state.radio : this.$store.state.radio_es
    }
  }
}
</script>

<style>

</style>

