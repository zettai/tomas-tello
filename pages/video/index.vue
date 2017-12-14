<template>
  <section class="section">
    <div class="container">
      <div>
        <ul>
          <li class="item f6" v-for="(item, index) in videos" :key="item.id">
            <span>{{ item.title | capitalize}}</span><br>
            <video width="600px" controls>
              <source :src="item.url" type="video/mp4"> Your browser does not support the video element.
            </video>
            <br><br><br>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['videos']),
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
