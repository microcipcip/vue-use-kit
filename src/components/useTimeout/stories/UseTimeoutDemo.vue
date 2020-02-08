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
        <td>timerStatus</td>
        <td>
          <span>{{ timerStatus }}</span>
        </td>
      </tr>
      <tr>
        <td colspan="3">
          <button
            class="button is-primary"
            @click="resetTimer"
            v-text="btnResetMsg"
          />
          <button class="button is-danger" @click="cancelTimer">
            Cancel Timer
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import { computed, ref } from '../../../api'
import { useTimeout } from '../../../vue-use-kit'

export default Vue.extend({
  name: 'UseTimeoutDemo',
  setup() {
    const timerDuration = 3000
    const { isReady, isIdle, cancelTimer, resetTimer } = useTimeout(
      timerDuration,
      false
    )

    const btnResetMsg = computed(() => {
      return isIdle.value ? 'Start timer' : 'Reset Timer'
    })

    const timerStatus = computed(() => {
      if (isIdle.value) return 'Idle'
      if (isReady.value === false) return 'Pending...'
      if (isReady.value === null) return 'Cancelled'
      return 'Completed'
    })

    return { btnResetMsg, timerStatus, cancelTimer, resetTimer }
  }
})
</script>
