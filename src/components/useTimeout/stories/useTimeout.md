# useTimeout

Vue function that returns `isReady` value as `true` after a specified `ms` amount of time.

## Reference

```typescript
useTimeout(
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

- `ms: number` how many milliseconds to wait before the timer is completed
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

    <button @click="resetTimer">Reset Timer</button>
    <button @click="cancelTimer">Cancel Timer</button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { useTimeout } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseTimeoutDemo',
    setup() {
      const timerDuration = 3000
      const { isReady, cancelTimer, resetTimer } = useTimeout(timerDuration)
      return { isReady, cancelTimer, resetTimer }
    }
  })
</script>
```