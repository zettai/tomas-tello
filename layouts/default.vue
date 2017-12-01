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

          <h1 class="fo-mask delay-200">
            {{ $t('home.title') }}
          </h1>
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

<style scoped>
/* Base */
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,700");
body {
  font-family: "Montserrat", sans-serif;
  background: #171719;
  position: relative;
  padding: 1vw;
  min-height: 100vh;
}

h1,
h2 {
  position: absolute;
  line-height: 1.3;
  left: 10%;
  top: 5%;
}

h1 {
  font-size: 5vw;
}

h2 {
  font-size: 3vw;
  top: 5%;
  left: 20%;
  margin-top: 10vw;
}

/* Mask */
.fo-mask {
  display: inline-block;
  overflow: hidden;
  clear: both;
}

.fo-mask span {
  color: transparent;
  -webkit-animation: show 0s forwards 0.4s;
  animation: show 0s forwards 0.4s;
}

.fo-mask:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: grey;
  -webkit-transform: translate3d(110%, 0, 0);
  transform: translate3d(110%, 0, 0);
  -webkit-animation: left-to-right 1s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  animation: left-to-right 1s cubic-bezier(0.17, 0.67, 0.83, 0.67);
}

/* Show animation */
@-webkit-keyframes show {
  0% {
    color: transparent;
  }
  100% {
    color: white;
  }
}
@keyframes show {
  0% {
    color: transparent;
  }
  100% {
    color: white;
  }
}

/* Left-to-right animation */
@-webkit-keyframes left-to-right {
  0% {
    -webkit-transform: translate3d(-100%, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(110%, 0, 0);
  }
}
@keyframes left-to-right {
  0% {
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    transform: translate3d(110%, 0, 0);
  }
}

/* Delay */
.delay-200.fo-mask span {
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.delay-200.fo-mask:after {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
</style>
