<template>
<nav class="" role="navigation">
</nav>
</template>

<style scoped>

</style>

<script>
export default {
  components: {},
  methods: {
    // return localized path for links
    path(url) {
      return this.$i18n.locale === 'en' ? url : '/' + this.$i18n.locale + url // TODO: make this a method available globally
    }
  }
}
</script>
