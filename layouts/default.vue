<template>
  <div>

      <nav class="navbar is-primary">
            <div class="container">
                <div class="navbar-brand">
                    <a class="navbar-item has-text-weight-bold" href="#"></a>
                    <div class="navbar-burger burger" data-target="navMenu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div class="navbar-menu" id="navMenu">
                    <div class="navbar-end">
                      <nuxt-link class="navbar-item" :to="'/'" exact>
                        {{ $t('links.home') }}
                      </nuxt-link>
                      <nuxt-link class="navbar-item" :to="'/album'" exact>
                        {{ $t('links.album') }}
                      </nuxt-link>
                      <nuxt-link class="navbar-item" :to="'/about'" exact>
                        {{ $t('links.about') }}
                      </nuxt-link>
                      <a class="navbar-item" v-if="$i18n.locale === 'en'" v-on:click="changeLocale('es')">{{ $t('links.spanish') }} &nbsp <i class="fa fa-language" aria-hidden="true"></i></a>
                      <a class="navbar-item" v-else v-on:click="changeLocale('en')">{{ $t('links.english') }} &nbsp <i class="fa fa-language" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
        </nav>

        <section class="hero is-dark">
            <div class="hero-body">
                <div class="container">
                  <img src="~/static/tt.png" style="float:right; height: 100px;">
                    <h1 class="title">{{ $t('home.title') }}</h1>
                    <h2 class="subtitle">{{ $t('home.introduction') }}</h2>
                </div>

            </div>
        </section>

    <nuxt/>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  },
  methods: {
    changeLocale(val) {
      return (this.$i18n.locale = val);
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      var $navbarBurgers = Array.prototype.slice.call(
        document.querySelectorAll(".navbar-burger"),
        0
      );
      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach(function($el) {
          $el.addEventListener("click", function() {
            // Get the target from the "data-target" attribute
            var target = $el.dataset.target;
            var $target = document.getElementById(target);

            // Toggle the class on both the "navbar-burger" and the "navbar-menu"
            $el.classList.toggle("is-active");
            $target.classList.toggle("is-active");
          });
        });
      }
    });
  }
};
</script>

<style>

</style>
