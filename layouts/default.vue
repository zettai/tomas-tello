<template>
  <div>
    <nav class="navbar is-black">
      <div class="container">
        <div class="navbar-brand">

          <div class="navbar-burger burger" data-target="navMenu" v-on:click="toggle()">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="navbar-menu" id="navMenu">
          <div class="navbar-start">
          <a class="navbar-item" v-if="$i18n.locale === 'en'" v-on:click="changeLocale('es')">
              <i class="fa fa-language" aria-hidden="true"></i> &nbsp {{ $t('links.spanish') }}
            </a>
            <a class="navbar-item" v-else v-on:click="changeLocale('en')">
              <i class="fa fa-language" aria-hidden="true"></i> &nbsp {{ $t('links.english') }}
            </a>
          </div>
          <div class="navbar-end">
            <nuxt-link class="navbar-item is-dark" :to="'/'" exact>
              {{ $t('links.home') }}
            </nuxt-link>
            <nuxt-link class="navbar-item" :to="'/album'" exact>
              {{ $t('links.album') }}
            </nuxt-link>
            <nuxt-link class="navbar-item" :to="'/images'" exact>
              {{ $t('links.images') }}
            </nuxt-link>
            <nuxt-link class="navbar-item" :to="'/about'" exact>
              {{ $t('links.about') }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </nav>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <img src="~/static/tomas-tello-logo.png" style="float: right; height: 100px;">
          <h1 class="title">{{ $t('home.title') }}</h1>
          <h2 class="subtitle">{{ $t('home.subtitle') }}</h2>
        </div>
      </div>
    </section>
    <nuxt/>
  </div>
</template>

<script>
export default {
  methods: {
    changeLocale(val) {
      this.$i18n.locale = val;
    },
    toggle() {
      document.querySelector(".navbar-burger").classList.toggle("is-active");
      document.querySelector(".navbar-menu").classList.toggle("is-active");
    }
  },
  mounted: function() {
    this.$i18n.locale = "";
    this.$i18n.locale = "en";
  }
};
</script>

<style>

</style>
