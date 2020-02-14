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
        <td>timerCallbackMsg</td>
        <td>
          <span>{{ timerCallbackMsg }}</span>
        </td>
      </tr>
      <tr>
        <td colspan="3">
          <button
            class="button is-primary"
            @click="start"
            v-text="btnResetMsg"
          />
          <button class="button is-danger" @click="cancel">
            Cancel Timer
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref, watch, computed } from '@src/api'
import { useTimeoutFn } from '@src/vue-use-kit'

export default Vue.extend({
  name: 'UseTimeoutFnDemo',
  setup() {
    const timerCallbackMsg = ref('Timer not completed')
    const timerDuration = 3000
    const timerHandler = () => {
      timerCallbackMsg.value = 'Timer completed!'
    }
    const { isReady, isIdle, cancel, start } = useTimeoutFn(
      timerHandler,
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

    watch(isReady, newVal => {
      if (newVal === false) timerCallbackMsg.value = 'Timer not completed'
      if (newVal === null) timerCallbackMsg.value = 'Timer cancelled!'
    })

    return {
      timerCallbackMsg,
      btnResetMsg,
      timerStatus,
      cancel,
      start
    }
  }
})
</script>
