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
        <td>counter</td>
        <td>
          <span>{{ counter }}</span>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <button class="button is-primary" @click="start" v-if="!isRunning">
            Start Interval
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
import { useInterval } from '@src/vue-use-kit'

export default Vue.extend({
  name: 'useIntervalDemo',
  setup() {
    const { isRunning, counter, start, stop } = useInterval(300)
    return { isRunning, counter, start, stop }
  }
})
</script>
