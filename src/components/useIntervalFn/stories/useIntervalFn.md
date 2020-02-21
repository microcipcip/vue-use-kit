# useIntervalFn

Vue function that calls given callback repeatedly on a fixed time delay.

## Reference

```typescript
function useIntervalFn(
    callback: Function,
    ms?: number,
    runOnMount?: boolean
): {
    isRunning: Ref<boolean>;
    start: () => void;
    stop: () => void;
 };
```

### Parameters

- `callback: Function` the function to call for each interval finishes
- `ms: number` how many milliseconds to wait before running the callback function
- `runOnMount: boolean` whether to run the interval on mount, `true` by default

### Returns

- `isRunning: Ref<boolean>` this value is `true` if the interval is running, `false` otherwise
- `start: Function` the function used for starting the interval
- `stop: Function` the function used for stopping the interval

## Usage

```html
<template>
  <div>
    <p>callbackCounter: {{ callbackCounter }}</p>

    <button @click="start" v-if="!isRunning">Start Interval</button>
    <button @click="stop" v-else>Stop Interval</button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { ref } from '@vue/composition-api'
  import { useIntervalFn } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseIntervalFnDemo',
    setup() {
      const ms = 300
      const callbackCounter = ref(0)
      const animHandler = () => {
        callbackCounter.value = callbackCounter.value + 1
      }

      const { isRunning, start, stop } = useIntervalFn(animHandler, ms)

      return { isRunning, start, stop, callbackCounter }
    }
  })
</script>
```
