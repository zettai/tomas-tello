<template>
  <section class="hero is-dark is-fullheight">
    <figure class="image is-256x256">
      <img src="~/static/tomas-tello-cover.png">
    </figure>
  </section>
</template>

<script>
export default {
  head() {
    return { title: this.$t("home.title") };
  }
};
</script>
