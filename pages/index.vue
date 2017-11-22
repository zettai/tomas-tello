<template>

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
