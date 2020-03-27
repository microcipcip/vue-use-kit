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
        <td>isPressed</td>
        <td>{{ isPressed }}</td>
      </tr>
      <tr>
        <td>keyPressCount</td>
        <td>{{ keyPressCount }}</td>
      </tr>
      <tr>
        <td colspan="2">
          <button class="button is-primary" @click="start" v-if="!isTracking">
            Start tracking key press
          </button>
          <button class="button is-danger" @click="stop" v-else>
            Stop tracking key press
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import { watch, ref } from '@src/api'
import { useKey } from '@src/vue-use-kit'

export default Vue.extend({
  name: 'UseKeyDemo',
  setup() {
    const keyPressCount = ref(0)
    const { isPressed, isTracking, start, stop } = useKey('g')

    watch(isPressed, isPress => isPress && keyPressCount.value++)

    return { keyPressCount, isPressed, isTracking, start, stop }
  }
})
</script>
