# useInterval

Vue function that updates the `counter` value repeatedly on a fixed time delay.

## Reference

```typescript
function useInterval(
    ms?: number,
    runOnMount?: boolean
): {
    isRunning: Ref<boolean>;
    counter: Ref<number>;
    start: () => void;
    stop: () => void;
 };
```

### Parameters

- `ms: number` how many milliseconds to wait before updating the counter
- `runOnMount: boolean` whether to run the interval on mount, `true` by default

### Returns

- `isRunning: Ref<boolean>` this value is `true` if the interval is running, `false` otherwise
- `counter: Ref<number>` the number of times the interval has run
- `start: Function` the function used for starting the interval
- `stop: Function` the function used for stopping the interval

## Usage

```html
<template>
  <div>
    <p>counter: {{ counter }}</p>

    <button @click="start" v-if="!isRunning">Start Interval</button>
    <button @click="stop" v-else>Stop Interval</button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { useInterval } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseIntervalDemo',
    setup() {
      const ms = 300

      const { isRunning, counter, start, stop } = useInterval(ms)

      return { isRunning, counter, start, stop }
    }
  })
</script>
```
