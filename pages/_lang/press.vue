<template>
  <v-container>
    <main>
      <ul>
        <li v-for="p in press()" :key="p.fields.title">
          <h3>
            <v-icon v-if="p.fields.file.contentType != 'application/pdf'">description</v-icon>
            <v-icon v-else>picture_as_pdf</v-icon>
            {{ p.fields.title }} - {{p.fields.description}}
          </h3>
          <a v-bind:href="p.fields.file.url">Download</a>
          <br />
          <br />
        </li>
      </ul>
    </main>
  </v-container>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export default {
  head() {
    return {
      title: this.$t('page.press.meta.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('page.press.meta.description')
        }
      ]
    }
  },
  methods: {
    press() {
      return this.$i18n.locale == 'en' ? this.$store.state.press : this.$store.state.press_es
    }
  }
}
</script>

<style>
</style>
