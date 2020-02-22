<template>
  <div class="wrapper">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>hasLeftPage</td>
          <td>{{ hasLeftPage }}</td>
        </tr>
        <tr>
          <td colspan="2">
            <button class="button is-primary" @click="start" v-if="!isTracking">
              Start tracking mouse leave event
            </button>
            <button class="button is-danger" @click="stop" v-else>
              Stop tracking mouse leave event
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { useMouseLeavePage } from '@src/vue-use-kit'

export default Vue.extend({
  name: 'UseMouseLeavePageDemo',
  setup() {
    const { hasLeftPage, isTracking, start, stop } = useMouseLeavePage()
    return { hasLeftPage, isTracking, start, stop }
  }
})
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
}
</style>
