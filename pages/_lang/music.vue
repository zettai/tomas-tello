<template>
  <v-container>
    <main>
      <h2 isBrand="true">{{ playingNow() }}</h2>
      <br />
      <v-btn v-bind:href="download_link2" target="_blank"> Download Varios (Zip)&nbsp;<v-icon>save_alt</v-icon></v-btn>
      <br />

      <v-btn @click="playAll()">Play All</v-btn>
      <v-btn @click="skipSong()">Skip</v-btn>
      <v-btn @click="pauseSong()">
        <v-icon>play_arrow</v-icon>/
        <v-icon>pause</v-icon>
      </v-btn>
      <v-btn v-bind:href="donate" target="_blank"> Donate&nbsp;<v-icon>wallet_giftcard</v-icon></v-btn>

      <div v-for="(a, i) in albums.items" :key="i">
        <h2>{{ a.fields.titulo }}</h2>
        <ul>
          <li v-for="(c, ix) in a.fields.cancion" :key="ix">
            <div>
              <v-btn color="normal" icon @click="playSong(c.fields.file.url, c.fields.title)">
                <v-icon>play_arrow</v-icon>
              </v-btn>
              <h3 class="inline-info">&nbsp;&nbsp;{{ c.fields.title }}</h3>
            </div>
          </li>
        </ul>
      </div>
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
          content: this.$t('page.music.meta.description'),
        },
      ],
    }
  },
  data() {
    return {
      download_link: 'https://u.pcloud.link/publink/show?code=XZ0UopXZ2hVbAWRy9JhHQdrWuzJt0Q9zmdKX',
      download_link2: 'https://u.pcloud.link/publink/show?code=XZamcBXZrLsCArgqKqbvfegWaSyIe7EUhgEy',
      donate: 'https://www.paypal.com/paypalme/shaolindelamor',
    }
  },
  components: {
    'app-h1': h1,
  },
  computed: {
    albums: function () {
      return this.$store.state.albums
    },
  },
  methods: {
    skipSong() {
      this.$root.$emit('skip-song')
    },
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
      const songs = []
      this.albums.items.forEach((alb) => {
        alb.fields.cancion.forEach((c) => {
          songs.push(c)
        })
      })
      this.$root.$emit('play-all', songs)
    },
    ...mapMutations(['showSnackbar', 'closeSnackbar', 'setSongName']),
    openSnackbar(message) {
      this.showSnackbar({ text: message })
    },
  },
}
</script>

<style scoped>
.inline-info {
  display: inline;
}
</style>
