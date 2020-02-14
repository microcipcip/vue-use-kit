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
    cancel: () => void;
    start: () => void;
}
```

### Parameters

- `callback: Function` the function to call when the timer finishes
- `ms: number` how many milliseconds to wait before running the callback function
- `runOnMount: boolean` whether to run the timeout on mount, `true` by default

### Returns

- `isReady: Ref<boolean> | null` the timer status
  - `false` when the timer is executing 
  - `true` when the timer is completed
  - `null` when the timer is cancelled
- `isIdle: Ref<boolean>` this value is `true` if the timer has ever been called, `false` otherwise
- `cancel: Function` the function used to cancel the timer
- `start: Function` the function used for starting or resetting the timer

## Usage

```html
<template>
  <div>
    <p>Timer status: {{ isReady ? 'Called!' : 'Pending...' }}</p>
    <p>Timeout Callback msg: {{ timerFnMsg }}</p>

    <button @click="start">Reset Timer</button>
    <button @click="cancel">Cancel Timer</button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { ref } from '@src/api'
  import { useTimeoutFn } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseTimeoutFnDemo',
    setup() {
      const timerFnMsg = ref('Timer not completed')
      const timerDuration = 3000
      const timerHandler = () => {
        timerFnMsg.value = 'Timer completed!'
      }

      const { isReady, cancel, start } = useTimeoutFn(
        timerHandler,
        timerDuration
      )

      return { timerFnMsg, isReady, cancel, start }
    }
  })
</script>
```
