<template>
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
        <td>callbackCounter</td>
        <td>Raf callback counter</td>
        <td>
          <span>{{ callbackCounter }}</span>
        </td>
      </tr>
      <tr>
        <td>animDuration</td>
        <td>Raf callback counter</td>
        <td>
          <span>{{ animDuration }}s</span>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <button class="button is-primary" @click="start" v-if="!isRunning">
            Resume animation
          </button>
          <button class="button is-danger" @click="stop" v-else>
            Stop animation
          </button>
          <br />
          <br />
          <br />
          <input type="number" v-model="fpsRef" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref } from '../../../api'
import { useRafFn } from '../../../vue-use-kit'

export default Vue.extend({
  name: 'UseRafFnDemo',
  setup() {
    const animDuration = ref(0)
    const callbackCounter = ref(0)
    const fpsRef = ref(4)
    const animHandler = (t: number) => {
      callbackCounter.value = callbackCounter.value + 1
      animDuration.value = Math.ceil(t)
    }

    const { isRunning, start, stop } = useRafFn(animHandler, fpsRef, false)
    return { isRunning, start, stop, callbackCounter, animDuration, fpsRef }
  }
})
</script>
