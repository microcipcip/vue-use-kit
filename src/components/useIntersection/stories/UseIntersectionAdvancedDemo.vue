<template>
  <div class="section">
    <div class="intersection" v-for="(item, index) in divElements">
      <use-intersection-element-demo
        class="intersection__el"
        :options="intersectionOpts"
        @changed="handleIntersectionChange"
      >
        <video controls loop>
          <source :src="getAlternateVideoUrl(index)" type="video/mp4" />
        </video>
      </use-intersection-element-demo>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UseIntersectionElementDemo from './UseIntersectionElementDemo.vue'

const getAlternateVideoUrl = (n: number) => {
  const videoNumber = n % 2 === 0 ? 1 : 2
  return `/demo/video${videoNumber}.mp4`
}

const setVideoPausedValue = ($el: Element, val: string) =>
  $el.setAttribute('data-is-paused', val)

const divElements = new Array(10)

export default Vue.extend({
  name: 'UseIntersectionDemo',
  components: { UseIntersectionElementDemo },
  setup() {
    const intersectionOpts = {
      root: null,
      threshold: 1
    }

    const handleIntersectionChange = ({
      target,
      intersectionRatio
    }: IntersectionObserverEntry) => {
      const isVisible = intersectionRatio === 1
      const $video = target.querySelector('video')
      if (!$video) return

      // Video pause logic
      if (!isVisible) {
        if ($video.paused) return
        $video.pause()
        setVideoPausedValue($video, '1')
      }

      // Video play logic
      if (isVisible && $video.dataset.isPaused === '1'){
        $video.play()
        setVideoPausedValue($video, '0')
      }
    }

    return {
      divElements,
      intersectionOpts,
      getAlternateVideoUrl,
      handleIntersectionChange
    }
  }
})
</script>

<style scoped>
.section {
  padding: 20px 0;
}

.intersection {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 920px;
}

.intersection__el {
  position: relative;
}
</style>
