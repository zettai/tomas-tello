<template>
  <v-snackbar
    :timeout="snackbar.timeout"
    :multi-line="snackbar.multiline === true"
    :color="snackbar.color"
    top
    v-model="snackbar.visible"
  >
    {{ snackbar.text }}
    <v-btn flat dark @click.native="closeSnackbar">X</v-btn>
  </v-snackbar>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    snackbar() {
      return this.$store.state.snackbar
    }
  },
  methods: {
    ...mapMutations(['closeSnackbar'])
  }
}
</script>
