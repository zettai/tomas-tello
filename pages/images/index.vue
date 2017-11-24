<template>
  <section class="section">
    <div class="container">
      <div>
        <ul>
          <li class="box" v-for="(item, index) in images" :key="item.id">
            <figure class="image is-64-64">
              <img :src="item.url">
            </figure>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["images"]),
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>
