<template>
  <div class="box">
    <div
      class="sprite"
      style="background-image: url('demo/muybridge.png')"
      :style="spriteStyle"
    ></div>

    <br />
    <div class="field">
      <button class="button is-info" @click="stop" v-if="isRunning">
        Pause
      </button>
      <button class="button is-primary" @click="start" v-else>
        Play
      </button>
      <button
        class="button is-primary"
        @click="invertDirection"
        title="Invert direction"
      >
        Invert direction
      </button>
    </div>
    <div class="field">
      <label class="label">Frames per second (fps)</label>
      <div class="control">
        <input class="input" type="number" min="1" max="120" v-model="fps" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref, computed } from '@src/api'
import { useRafFn } from '@src/vue-use-kit'

const spriteOpts = {
  w: 175, // Enlarge sprite 2x
  h: 130, // Enlarge sprite 2x
  frames: 16
}

export default Vue.extend({
  name: 'UseRafFnAdvancedDemo',
  setup() {
    const fps = ref(32)
    const spriteDirection = ref(-1)
    const spriteCurrentFrame = ref(0)

    let countFrame = 0
    const handleAnim = () => {
      // Get current frame
      spriteCurrentFrame.value = countFrame % spriteOpts.frames
      countFrame = spriteDirection.value === 1 ? countFrame + 1 : countFrame - 1
    }

    const spriteStyle = computed(() => {
      const posX = spriteOpts.w * spriteCurrentFrame.value
      return {
        backgroundPosition: `${posX}px`
      }
    })

    const invertDirection = () => {
      spriteDirection.value = spriteDirection.value * -1
    }

    const { isRunning, start, stop } = useRafFn(handleAnim, fps)
    return { isRunning, start, stop, fps, invertDirection, spriteStyle }
  }
})
</script>

<style scoped>
.sprite {
  width: 175px;
  height: 130px;
}

/* Enlarge sprite 2x */
@media only screen and (min-width: 600px) {
  .sprite {
    transform-origin: 0% 0%;
    transform: scale(2);
    margin-bottom: 135px;
  }
}
</style>
