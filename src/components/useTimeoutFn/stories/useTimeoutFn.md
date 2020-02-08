# useTimeoutFn

Vue function that calls given callback function after a specified amount of milliseconds.

## Reference

```typescript
useTimeoutFn(
    callback: Function,
    ms?: number
): {
    isReady: Ref<boolean | null>;
    cancelTimer: () => void;
    resetTimer: () => void;
}
```

### Parameters

- `callback: Function` the function to call when the timer finishes
- `ms: number` how many milliseconds to wait before running the callback function

### Returns

- `isReady: boolean | null` the timer status
- `cancelTimer: Function` the function used for canceling the timer
- `resetTimer: Function` the function used for resetting the timer

## Usage

```html
<template>
  <div>
    <p>Timeout status: {{ isReady ? 'Called!' : 'Pending...' }}</p>
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
