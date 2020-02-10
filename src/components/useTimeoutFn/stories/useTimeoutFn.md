# useTimeoutFn

Vue function that calls given callback function after a specified `ms` amount of time.

## Reference

```typescript
useTimeoutFn(
    callback: Function,
    ms?: number,
    runOnMount?: boolean
): {
    isReady: Ref<boolean | null>;
    isIdle: Ref<boolean>;
    cancelTimer: () => void;
    resetTimer: () => void;
}
```

### Parameters

- `callback: Function` the function to call when the timer finishes
- `ms: number` how many milliseconds to wait before running the callback function
- `runOnMount: boolean` whether to run the timeout on mount, `true` by default

### Returns

- `isReady: boolean | null` the timer status
  - `false` when the timer is executing 
  - `true` when the timer is completed
  - `null` when the timer is cancelled
- `isIdle: boolean` this value is `true` if the timer has ever been called, `false` otherwise
- `cancelTimer: Function` the function used to cancel the timer
- `resetTimer: Function` the function used for resetting the timer

## Usage

```html
<template>
  <div>
    <p>Timer status: {{ isReady ? 'Called!' : 'Pending...' }}</p>
    <p>Timeout Callback msg: {{ timerFnMsg }}</p>

    <button @click="resetTimer">Reset Timer</button>
    <button @click="cancelTimer">Cancel Timer</button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { ref } from '../../../api'
  import { useTimeoutFn } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseTimeoutFnDemo',
    setup() {
      const timerFnMsg = ref('Timer not completed')
      const timerDuration = 3000
      const timerHandler = () => {
        timerFnMsg.value = 'Timer completed!'
      }

      const { isReady, cancelTimer, resetTimer } = useTimeoutFn(
        timerHandler,
        timerDuration
      )

      return { timerFnMsg, isReady, cancelTimer, resetTimer }
    }
  })
</script>
```