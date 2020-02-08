<template>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>Prop</th>
        <th>Description</th>
        <th>Message</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>isReadyStatus</td>
        <td>Timeout status</td>
        <td>
          <span>{{ isReadyStatus }}</span>
        </td>
      </tr>
      <tr>
        <td>timerFnMsg</td>
        <td>Timer function callback message</td>
        <td>
          <span>{{ timerFnMsg }}</span>
        </td>
      </tr>
      <tr>
        <td>
          <button class="button is-primary" @click="resetTimer">
            Reset Timer
          </button>
          <button class="button is-danger" @click="cancelTimer">
            Cancel Timer
          </button>
        </td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref, watch, computed } from '../../../api'
import { useTimeoutFn } from '../../../vue-use-kit'

export default Vue.extend({
  name: 'UseTimeoutFnDemo',
  setup() {
    const timerFnMsg = ref('Timer not completed')
    const { isReady, cancelTimer, resetTimer } = useTimeoutFn(() => {
      timerFnMsg.value = 'Timer completed!'
    }, 3000)

    const isReadyStatus = computed(() => {
      if (isReady.value === false) return 'Pending...'
      if (isReady.value === null) return 'Cancelled'
      return 'Called!'
    })

    watch(isReady, newVal => {
      if (newVal === false) timerFnMsg.value = 'Timer not completed'
      if (newVal === null) timerFnMsg.value = 'Timer cancelled!'
    })

    return { timerFnMsg, isReadyStatus, cancelTimer, resetTimer }
  }
})
</script>
