<template>
  <div class="Content">
    <div class="container">
      <logo/>
      <h1 class="Content__Title">{{ $t('home.title') }}</h1>
      <p>{{ $t('home.introduction') }}</p>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  },
  head() {
    return { title: this.$t("home.title") };
  }
};
</script>
