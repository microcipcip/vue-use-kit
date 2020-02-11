<template>
  <div class="box">
    <div
      class="sprite"
      style="background-image: url('demo/muybridge.png')"
      :style="spriteStyle"
    ></div>

    <br />
    <div class="field">
      <button class="button" @click="stop" v-if="isRunning">
        <span class="icon"><i class="fas fa-pause"></i></span>
      </button>
      <button class="button" @click="start" v-else>
        <span class="icon"><i class="fas fa-play"></i></span>
      </button>
      <button class="button" @click="backward">
        <span class="icon"><i class="fas fa-backward"></i></span>
      </button>
      <button class="button" @click="forward">
        <span class="icon"><i class="fas fa-forward"></i></span>
      </button>
    </div>
    <div class="field">
      <label class="label">Frames per second (fps)</label>
      <div class="control">
        <input class="input" type="number" min="1" max="121" v-model="fps" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref, computed } from '../../../api'
import { useRafFn } from '../../../vue-use-kit'

const spriteOpts = {
  w: 175 * 2, // Enlarge sprite 2x
  h: 130 * 2, // Enlarge sprite 2x
  frames: 16
}

export default Vue.extend({
  name: 'UseRafFnAdvancedDemo',
  setup() {
    const fps = ref(16)
    const spriteDirection = ref(-1)
    const spriteCurrentFrame = ref(0)

    let countFrame = 0
    const handleAnim = () => {
      // Get current frame
      spriteCurrentFrame.value = countFrame % spriteOpts.frames
      countFrame = countFrame + 1
    }

    const spriteStyle = computed(() => {
      const posX =
        spriteOpts.w * spriteCurrentFrame.value * spriteDirection.value
      return {
        backgroundPosition: `${posX}px`
      }
    })

    const backward = () => {
      spriteDirection.value = 1
    }

    const forward = () => {
      spriteDirection.value = -1
    }

    const { isRunning, start, stop } = useRafFn(handleAnim, fps)
    return { isRunning, start, stop, backward, forward, fps, spriteStyle }
  }
})
</script>

<style>
.sprite {
  /* Enlarge sprite 2x */
  width: 350px;
  height: 260px;
  background-size: 5600px 260px;
}
</style>
