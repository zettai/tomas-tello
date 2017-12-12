<template>
  <section class="section">
    <div class="container">
      <div>
        <ul>
          <li class="item f6" v-for="(item, index) in items" :key="item.id">
            <span>{{ item.title | capitalize}}</span><br>
            <audio controls>
              <source :src="item.url" type="audio/mpeg"> Your browser does not support the audio element.
            </audio>
            <br>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['items']),
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

</style>
