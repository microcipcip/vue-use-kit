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
        <td>orientation</td>
        <td>
          <pre>{{ JSON.stringify(orientation, null, 2) }}</pre>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <button class="button is-primary" @click="start" v-if="!isTracking">
            Enable orientation tracking
          </button>
          <button class="button is-danger" @click="stop" v-else>
            Disable orientation tracking
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import { useOrientation } from '@src/vue-use-kit'

export default Vue.extend({
  name: 'UseOrientationDemo',
  setup() {
    const { orientation, isTracking, start, stop } = useOrientation()
    return { orientation, isTracking, start, stop }
  }
})
</script>
