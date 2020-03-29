<template>
  <div>
    <div class="canvas">
      <div class="canvas__target" :style="canvasTargetPos">🐱‍👤</div>
    </div>
    <br />
    <button class="button is-primary" @click="start" v-if="!isTracking">
      Start tracking key press
    </button>
    <button class="button is-danger" @click="stop" v-else>
      Stop tracking key press
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref } from '@src/api'
import { useKey } from '@src/vue-use-kit'
import { computed } from '@vue/composition-api'

const add = (coord: { value: number }) => () => (coord.value = coord.value + 4)
const sub = (coord: { value: number }) => () => (coord.value = coord.value - 4)

export default Vue.extend({
  name: 'UseKeyDemo',
  setup() {
    const x = ref(0)
    const y = ref(0)

    const arrowUp = useKey('ArrowUp', sub(y))
    const arrowDown = useKey('ArrowDown', add(y))
    const arrowLeft = useKey('ArrowLeft', sub(x))
    const arrowRight = useKey('ArrowRight', add(x))

    const isTracking = ref(true)
    const start = () => {
      isTracking.value = true
      arrowUp.start()
      arrowDown.start()
      arrowLeft.start()
      arrowRight.start()
    }

    const stop = () => {
      isTracking.value = false
      arrowUp.stop()
      arrowDown.stop()
      arrowLeft.stop()
      arrowRight.stop()
    }

    const canvasTargetPos = computed(() => ({
      transform: `translate(-50%, -50%) translate(${x.value}px, ${y.value}px)`
    }))

    return { canvasTargetPos, isTracking, start, stop }
  }
})
</script>

<style scoped>
.canvas {
  position: relative;
  width: 100%;
  height: 200px;
  background: #f1f1f1;
}

.canvas__target {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
}
</style>
