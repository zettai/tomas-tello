<template>
  <v-container>
    <main>
      <app-h1 isBrand="true">{{ playingNow() }}</app-h1>
      <br />
      <v-btn v-bind:href="download_link" target="_blank"> Download zip&nbsp;<v-icon>save_alt</v-icon></v-btn>
      <v-btn v-bind:href="donate" target="_blank"> Donate&nbsp;<v-icon>wallet_giftcard</v-icon></v-btn>
      <br />
      <v-btn @click="playAll()">Play All</v-btn>
      <v-btn @click="pauseSong()">
        <v-icon>play_arrow</v-icon>/
        <v-icon>pause</v-icon>
      </v-btn>
      <ul>
        <li v-for="m in music" :key="m.fields.title">
          <div>
            <v-btn color="normal" icon @click="playSong(m.fields.file.url, m.fields.title)">
              <v-icon>play_arrow</v-icon>
            </v-btn>
            <h3 class="inline-info">&nbsp;&nbsp;{{ m.fields.title }}</h3>
          </div>
        </li>
      </ul>
    </main>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import h1 from '@/components/h1'

export default {
  head() {
    return {
      title: this.$t('page.music.meta.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('page.music.meta.description')
        }
      ]
    }
  },
  data() {
    return {
      download_link: 'https://u.pcloud.link/publink/show?code=XZ0UopXZ2hVbAWRy9JhHQdrWuzJt0Q9zmdKX',
      donate: 'https://www.paypal.com/paypalme/shaolindelamor'
    }
  },
  components: {
    'app-h1': h1
  },
  computed: {
    music: function() {
      return this.$store.state.songs
    }
  },
  methods: {
    downloadFile(file) {
      const link = document.createElement('a')
      link.href = file
      link.download = file
      link.click()
      URL.revokeObjectURL(link.href)
    },
    playingNow() {
      return this.$store.state.playingNow
    },
    playSong(url, fileName) {
      let data = {}
      data.url = url
      data.fileName = fileName
      this.openSnackbar(fileName)
      this.$root.$emit('play-song', data)
    },
    pauseSong() {
      this.$root.$emit('play-pause-song', null)
    },
    playAll() {
      this.$root.$emit('play-all', this.music)
    },
    ...mapMutations(['showSnackbar', 'closeSnackbar', 'setSongName']),
    openSnackbar(message) {
      this.showSnackbar({ text: message })
    }
  }
}
</script>

<style scoped>
.inline-info {
  display: inline;
}
</style>
