<template>
  <section class="section">
    <div class="container is-fluid">
      <div class="columns is-8 is-multiline">
        <div class="column is-one-fifth " v-for="(item, index) in articles" :key="item.id">
          <h1 class="article">{{item.title}}</h1>
          <i v-if="!item.pdf" class="fa fa-file-word-o fa-3x" aria-hidden="true"></i>
          <i v-else class="fa fa-file-pdf-o fa-3x" aria-hidden="true"></i>
          <h2>{{ $t('language') }}: {{item.lang}}</h2>
          <a :href="item.url">{{ $t('download') }}</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['articles']),
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<style>
.article {
  font-size: 15px;
  font-weight: bold;
}
</style>

