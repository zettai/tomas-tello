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
  // Calling contentful here to avoid problems with localized data
  asyncData({ env, store }) {
    return Promise.all([
      client.getEntries({
        content_type: 'page',
        order: '-sys.createdAt'
      })
    ])
      .then(([page]) => {
        function findExactPage(item) {
          return item.fields.title === 'Home Page'
        }
        return {
          page: page.items.filter(findExactPage)[0]
        }
      })
      .catch(console.error)
  }
}
</script>

<style>

</style>
