<template>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>Prop</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>callbackCounter</td>
        <td>
          <span>{{ callbackCounter }}</span>
        </td>
      </tr>
      <tr>
        <td colspan="3">
          <button class="button is-primary" @click="start" v-if="!isRunning">
            Resume Interval
          </button>
          <button class="button is-danger" @click="stop" v-else>
            Stop Interval
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref } from '@src/api'
import { useIntervalFn } from '@src/vue-use-kit'

export default Vue.extend({
  name: 'UseIntervalFnDemo',
  setup() {
    const ms = 300
    const callbackCounter = ref(0)
    const animHandler = () => {
      callbackCounter.value = callbackCounter.value + 1
    }

    const { isRunning, start, stop } = useIntervalFn(animHandler, ms)

    return { isRunning, start, stop, callbackCounter }
  }
})
</script>
