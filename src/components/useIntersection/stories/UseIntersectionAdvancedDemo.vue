<template>
  <div class="section">
    <div class="intersection-adv" v-for="el in divElements">
      <use-intersection-element-demo
        class="intersection-adv__el"
        :options="intersectionOpts"
        @change="handleIntersectionChange"
      >
        <video controls loop>
          <source src=http://techslides.com/demos/sample-videos/small.mp4
          type=video/mp4>
        </video>
      </use-intersection-element-demo>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UseIntersectionElementDemo from './UseIntersectionElementDemo.vue'

export default Vue.extend({
  name: 'UseIntersectionDemo',
  components: { UseIntersectionElementDemo },
  setup() {
    const intersectionOpts = {
      root: null,
      threshold: 1
    }

    const divElements = new Array(100)

    const handleIntersectionChange = ({
      target,
      intersectionRatio
    }: IntersectionObserverEntry) => {
      const isVisible = intersectionRatio === 1
      const $video = target.querySelector('video')
      if (!$video) return

      if (!isVisible) {
        if (!$video.paused) $video.pause()
      } else {
        if ($video.paused) $video.play()
      }
    }

    return { divElements, intersectionOpts, handleIntersectionChange }
  }
})
</script>

<style>
.section {
  padding: 20px 0;
}

.intersection-adv {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 920px;
}

/* El */
.intersection-adv__el {
  position: relative;
}
</style>
