<template>
  <div>
    <audio ref="control" controls @ended="songEnded()">
      <source ref="source" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      loaded: false,
      playList: {},
    }
  },
  mounted() {
    this.$root.$on('play-song', (data) => {
      this.loaded = true
      this.playSingleSong(data)
    })
    this.$root.$on('skip-song', (data) => {
      this.songEnded()
    })
    this.$root.$on('play-all', (data) => {
      this.loaded = true
      this.playAllSongs(data)
    })
    this.$root.$on('play-pause-song', () => {
      if (this.loaded) {
        this.playPauseSong()
      }
    })
  },
  methods: {
    songEnded() {
      if (this.playList.length > 0) {
        let newSong = this.playList.shift()
        let song = {}

        song.url = newSong.fields.file.url
        song.fileName = newSong.fields.title
        this.playSingleSong(song)
      }
    },
    playPauseSong() {
      let control = this.$refs.control

      control.paused == true ? control.play() : control.pause()
      control.paused == true ? this.openSnackbar('Paused') : this.openSnackbar('Play')
    },
    playSingleSong(song) {
      let source = this.$refs.source
      let control = this.$refs.control

      if (song.url && song.fileName) {
        source.src = song.url
        this.setSongName(song.fileName)
        this.openSnackbar(song.fileName)
        control.load()
        control.play()
      }
    },
    playAllSongs(data) {
      this.playList = JSON.parse(JSON.stringify(data))
      let newSong = this.playList.shift()
      let song = {}
      song.url = newSong.fields.file.url
      song.fileName = newSong.fields.title
      this.playSingleSong(song)
    },
    ...mapMutations(['showSnackbar', 'closeSnackbar', 'setSongName']),
    openSnackbar(message) {
      this.showSnackbar({ text: message })
    },
  },
}
</script>

<style>
audio {
  padding: 10px;
}
</style>
