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
          <td>callbackCounter</td>
          <td>
            Counter showing how many times the callback was called within the
            Raf loop
          </td>
          <td>
            <span>{{ callbackCounter }}</span>
          </td>
        </tr>
        <tr>
          <td>timeElapsed</td>
          <td>Total time elapsed</td>
          <td>
            <span>{{ timeElapsed }}ms</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="form">
      <div class="field">
        <label class="label">Frames per second (fps)</label>
        <div class="control">
          <input class="input" type="number" min="1" max="121" v-model="fps" />
        </div>
      </div>
      <div class="field">
        <button
          class="button is-primary"
          @click="
            start()
            init()
          "
          v-if="!isRunning"
        >
          {{ isInit ? 'Resume timer' : 'Start timer' }}
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
import { ref } from '../../../api'
import { useRafFn } from '../../../vue-use-kit'

export default Vue.extend({
  name: 'UseRafFnDemo',
  setup() {
    const isInit = ref(false)
    const timeElapsed = ref(0)
    const callbackCounter = ref(0)
    const fps = ref(120)
    const animHandler = (t: number) => {
      callbackCounter.value = callbackCounter.value + 1
      timeElapsed.value = Math.ceil(t)
    }

    const init = () => {
      isInit.value = true
    }

    const { isRunning, start, stop } = useRafFn(animHandler, fps, false)

    return {
      init,
      isInit,
      isRunning,
      start,
      stop,
      callbackCounter,
      timeElapsed,
      fps
    }
  }
})
</script>

<style>
.form {
  max-width: 400px;
}
</style>
