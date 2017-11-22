<template>
  <section class="section">
            <div class="container">
    <h1>{{ $t('about.title') }}</h1>
<div class="box">Curabitur accumsan turpis pharetra <strong>augue tincidunt</strong> blandit. Quisque condimentum maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna vel cursus venenatis. Suspendisse potenti. Etiam mattis sem rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et neque nisl.</div>
    <div class="box">
    <p>{{ $t('about.introduction') }}
    <a class="button is-info is-outlined" href="https://twitter.com/shaolindelamor">
                            <span class="icon">
                                <i class="fa fa-twitter"></i>
                            </span>
                            <span>shaolindelamor</span>
                        </a></p>
                        </div>


</div>
</section>
</template>

<script>
export default {
  head() {
    return { title: this.$t("about.title") };
  }
};
</script>
