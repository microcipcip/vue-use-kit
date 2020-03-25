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
        <td>width, height</td>
        <td>{{ width }}px - {{ height }}px</td>
      </tr>
      <tr>
        <td colspan="2">
          <button class="button is-primary" @click="start" v-if="!isTracking">
            Start tracking window resize
          </button>
          <button class="button is-danger" @click="stop" v-else>
            Stop tracking window resize
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import { useWindowSize } from '@src/vue-use-kit'

export default Vue.extend({
  name: 'UseWindowSizeDemo',
  setup() {
    const { width, height, isTracking, start, stop } = useWindowSize()
    return { width, height, isTracking, start, stop }
  }
})
</script>
