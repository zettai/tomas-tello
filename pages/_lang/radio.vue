<template>
  <v-container>
    <main>
      <ul>
        <li v-for="p in radio()" :key="p.id">
          <app-h1 isBrand="true" v-if="p.message">{{ p.message }}</app-h1>
          <v-spacer></v-spacer>
          <div v-if="p.body">
            <v-icon>radio</v-icon>&nbsp;&nbsp;<a :href="p.body" rel="nofollow" target="_blank">{{ p.body }}</a>
          </div>
        </li>
      </ul>
    </main>
  </v-container>
</template>

<script>
import h1 from '@/components/h1'

export default {
  components: {
    'app-h1': h1,
  },
  head() {
    return {
      title: this.$t('page.radio.meta.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('page.radio.meta.description'),
        },
      ],
    }
  },
  methods: {
    radio() {
      return this.$i18n.locale == 'en' ? this.$store.state.radio : this.$store.state.radio_es
    },
  },
}
</script>

<style></style>
