<template>
  <div class='background-container' :style="{ backgroundImage: 'url(' + page.fields.background.fields.file.url + ')',  }" >
    <no-ssr>
      <vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
    </no-ssr>
  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'

const client = createClient()

export default {
  // html meta data for page
  head() {
    return {
      title: this.$t('page.index.meta.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('page.index.meta.description')
        }
      ]
    }
  },
  asyncData({ env, store }) {
    return Promise.all([
      // fetch all entries sorted by creation date
      client.getEntries({
        content_type: 'page',
        order: '-sys.createdAt'
      })
    ])
      .then(([page]) => {
        // return data that should be available in the template

        function findExactPage(item) {
          return item.fields.title === 'Home Page'
        }

        var findPage = page.items.filter(findExactPage)
        return {
          page: findPage[0]
        }
      })
      .catch(console.error)
  }
}
</script>

<style>
.background-container {
  background-repeat: no-repeat;
  background-size: cover;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
