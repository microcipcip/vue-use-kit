# useRafFn

Vue function that calls given callback inside the RAF loop.

You can optionally specify how many times the callback should
run in a second by specifying the `fps` value.

## Reference

```typescript
type TFps = number | Ref<number>;

function useRafFn(
    callback: Function,
    fps?: TFps,
    runOnMount?: boolean
): {
    isRunning: Ref<boolean>;
    start: () => void;
    stop: () => void;
}
```

### Parameters

- `callback: Function` the function to call inside the Raf loop
- `fps: number | Ref<number>` the amount of times per second that the callback should run.
  Please note that when a value greater or equal to `60` is defined, the `fps` logic will be skipped completely
  therefore the callback will run at full speed. By default the value is set to `60` so it will indeed
  run at full speed
- `runOnMount: boolean` whether to run the Raf loop on mount, `true` by default.
  If `false`, you'll have to start the Raf with the `start` function

### Returns

- `isRunning: Ref<boolean>` the Raf status
  - `false` when the Raf loop is paused
  - `true` when the Raf loop is running
- `start: Function` the function used for starting the Raf loop
- `stop: Function` the function used for stopping the Raf loop

## Usage

```html
<template>
  <div>
    <div>Elapsed: {{ elapsedTime }}</div>
    <div><button @click="start">Start loop</button></div>
    <div><button @click="stop">Stop loop</button></div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { ref } from '@vue/composition-api'
  import { useRafFn } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseRafFnDemo',
    setup() {
      const fps = 60
      const elapsedTime = ref(0)
      const animHandler = elapsedTimeValue => {
        elapsedTime.value = Math.ceil(elapsedTimeValue)
      }

      const { start, stop } = useRafFn(animHandler, fps)

      return {
        start,
        stop,
        elapsedTime
      }
    }
  })
</script>
```
