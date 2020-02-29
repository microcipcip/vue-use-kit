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
        <td>geo</td>
        <td>
          <pre>{{ JSON.stringify(geo, null, 2) }}</pre>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <button class="button is-primary" @click="start" v-if="!isTracking">
            Enable geolocation tracking
          </button>
          <button class="button is-danger" @click="stop" v-else>
            Disable geolocation tracking
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import { useGeolocation } from '@src/vue-use-kit'

export default Vue.extend({
  name: 'UseGeolocationDemo',
  setup() {
    const { isTracking, geo, start, stop } = useGeolocation({}, false)
    return { isTracking, geo, start, stop }
  }
})
</script>
