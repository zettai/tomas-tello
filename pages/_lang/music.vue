<template>
  <v-container>
    <main>
      <h2>{{playing}}</h2>
      <v-btn @click="playAll()">Play All</v-btn>
      <v-btn icon @click="pauseSong()"><v-icon>pause</v-icon></v-btn>
      <ul>
        <li v-for="m in music" :key="m.fields.title">
          <div>
            <v-btn color="normal" icon @click="playSong(m.fields.file.url, m.fields.file.fileName)"><v-icon>play_arrow</v-icon></v-btn>
          <a v-bind:href="m.fields.file.url"><v-icon>save_alt</v-icon></a>
          <h3 class="inline-info">&nbsp;&nbsp;{{ m.fields.title }}</h3>
          </div>
        </li>
      </ul>      
    </main>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
    playing: ''
    }
  },
  methods: {
    playSong(url, fileName) {
      let el = document.getElementById('findthisaudio')
      let src = document.getElementById('findthissource')

      src.src = url
      el.load()
      el.play()
      this.openSnackbar(fileName)
      this.playing = fileName
    },
    pauseSong() {
      let el = document.getElementById('findthisaudio')
      el.pause()
    },
    playAll() {

    },
    ...mapMutations(["showSnackbar", "closeSnackbar"]),
    openSnackbar(message) {
      this.showSnackbar({ text: message });
    }
  },
  computed: {
    music: function() {
      return this.$store.state.songs
    }
  },
  // html meta data for page
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
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
}

.inline-info {
  display: inline;
}
</style>

