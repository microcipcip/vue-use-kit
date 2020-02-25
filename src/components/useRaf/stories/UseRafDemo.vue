<template>
  <div>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Description</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>clock</td>
          <td>Elapsed time (formatted)</td>
          <td>{{ clock }}</td>
        </tr>
      </tbody>
    </table>
    <div class="form">
      <div class="field">
        <label class="label">Frames per second (fps)</label>
        <div class="control">
          <input class="input" type="number" min="1" max="120" v-model="fps" />
        </div>
      </div>
      <div class="field">
        <button class="button is-primary" @click="start" v-if="!isRunning">
          Resume timer
        </button>
        <button class="button is-danger" @click="stop" v-else>
          Stop timer
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref, computed } from '@src/api'
import { useRaf } from '@src/vue-use-kit'

const pad = (n: number) => (n < 10 ? '0' + n : n)
const msToTime = (duration: number) => {
  const milliseconds = parseInt(`${(duration % 1000) / 10}`)
  const seconds = Math.floor((duration / 1000) % 60)
  const minutes = Math.floor((duration / (1000 * 60)) % 60)
  return `${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`
}

export default Vue.extend({
  name: 'UseRafDemo',
  setup() {
    const fps = ref(60)
    const { isRunning, elapsed, start, stop } = useRaf(fps)

    const clock = computed(() => msToTime(elapsed.value))

    return {
      isRunning,
      start,
      stop,
      clock,
      fps
    }
  }
})
</script>

<style scoped>
.form {
  max-width: 400px;
}
</style>
