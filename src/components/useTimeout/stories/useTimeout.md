# useTimeout

Vue function that returns `isReady` value as `true` after a specified `ms` amount of time.

## Reference

```typescript
function useTimeout(
    ms?: number,
    runOnMount?: boolean
): {
    isReady: Ref<boolean | null>;
    start: () => void;
    stop: () => void;
}
```

### Parameters

- `ms: number` how many milliseconds to wait before the timer is completed
- `runOnMount: boolean` whether to run the timeout on mount, `true` by default

### Returns

- `isReady: Ref<boolean | null>` the timer status
  - `false` when the timer is executing
  - `true` when the timer is completed
  - `null` when the timer is idle
- `start: Function` the function used for starting or resetting the timer
- `stop: Function` the function used to stop the timer

## Usage

```html
<template>
  <div>
    <p>Timer status: {{ isReady ? 'Called!' : 'Pending...' }}</p>

    <button @click="start">Reset Timer</button>
    <button @click="stop">Stop Timer</button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { useTimeout } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseTimeoutDemo',
    setup() {
      const timerDuration = 3000
      const { isReady, start, stop } = useTimeout(timerDuration)
      return { isReady, start, stop }
    }
  })
</script>
```
