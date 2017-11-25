<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <figure class="image is-256x256">
            <img src="~/static/tomas-tello-bio.jpg">
          </figure>
          <div class="box">
            <div>{{ $t('about.bio') }}</div>
          </div>
        </div>
        <div class="column">
          <div class="box">
            <p>{{ $t('about.twitter') }}
              <a class="button is-info is-outlined"
                 href="https://twitter.com/shaolindelamor">
                <span class="icon">
                  <i class="fa fa-twitter"></i>
                </span>
                <span>shaolindelamor</span>
              </a>
            </p>
            <br>
            <p>{{ $t('about.support') }}
              <a class="button is-link is-outlined"
                 href="https://www.paypal.me/shaolindelamor">
                <span class="icon">
                  <i class="fa fa-paypal"></i>
                </span>
                <span>shaolindelamor</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  head() {
    return { title: this.$t("about.title") };
  }
};
</script>
