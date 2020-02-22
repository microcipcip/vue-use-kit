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
        <td>devicesState</td>
        <td>
          <pre>{{ JSON.stringify(devicesState, null, 2) }}</pre>
        </td>
      </tr>
      <tr>
        <td>isTracked</td>
        <td>{{ isTracked }}</td>
      </tr>
      <tr>
        <td colspan="2">
          <button class="button is-primary" @click="start" v-if="!isTracking">
            Start tracking media devices
          </button>
          <button class="button is-danger" @click="stop" v-else>
            Stop tracking media devices
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import { useMediaDevices } from '@src/vue-use-kit'

export default Vue.extend({
  name: 'UseMediaDevicesDemo',
  setup() {
    const {
      devicesState,
      isTracking,
      isTracked,
      start,
      stop
    } = useMediaDevices(false)
    return { devicesState, isTracking, isTracked, start, stop }
  }
})
</script>
