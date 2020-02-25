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
        <td>isIdle</td>
        <td class="idle" :class="{ '-is-idle': isIdle }">{{ isIdle }}</td>
      </tr>
      <tr>
        <td colspan="2">
          <button
            class="button is-primary"
            @click="start"
            v-if="!isTracking"
          >
            Start tracking idle status
          </button>
          <button class="button is-danger" @click="stop" v-else>
            Stop tracking idle status
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref } from '@src/api'
import { useIdle } from '@src/vue-use-kit'

export default Vue.extend({
  name: 'UseIdleDemo',
  setup() {
    const { isIdle, isTracking, start, stop } = useIdle(2500)
    return { isIdle, isTracking, start, stop }
  }
})
</script>

<style scoped>
.idle {
  color: #fff;
  background: #981105;
}

.idle.-is-idle {
  color: #fff;
  background: #209817;
}
</style>
