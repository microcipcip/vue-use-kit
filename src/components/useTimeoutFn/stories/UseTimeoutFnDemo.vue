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
        <td>{{ timerStatus }}</td>
      </tr>
      <tr>
        <td>timerCallbackMsg</td>
        <td>{{ timerCallbackMsg }}</td>
      </tr>
      <tr>
        <td colspan="2">
          <button
            class="button is-primary"
            @click="start"
            v-text="btnResetMsg"
          />
          <button class="button is-danger" @click="stop">
            Stop Timer
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref, watch, computed } from '@vue/composition-api'
import { useTimeoutFn } from '@src/vue-use-kit'

export default Vue.extend({
  name: 'UseTimeoutFnDemo',
  setup() {
    const timerCallbackMsg = ref('Timer not completed')
    const timerDuration = 3000
    const timerHandler = () => {
      timerCallbackMsg.value = 'Timer completed!'
    }
    const { isReady, start, stop } = useTimeoutFn(
      timerHandler,
      timerDuration,
      false
    )

    const btnResetMsg = computed(() => {
      return isReady.value === null ? 'Start timer' : 'Reset Timer'
    })

    const timerStatus = computed(() => {
      if (isReady.value === false) return 'Pending...'
      if (isReady.value === null) return 'Idle'
      return 'Completed'
    })

    watch(isReady, newVal => {
      if (newVal === false) timerCallbackMsg.value = 'Timer not completed'
      if (newVal === null) timerCallbackMsg.value = 'Timer stopped!'
    })

    return {
      timerCallbackMsg,
      btnResetMsg,
      timerStatus,
      start,
      stop
    }
  }
})
</script>
