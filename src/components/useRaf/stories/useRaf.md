# useRaf

Vue function that returns the total elapsed time excluding paused intervals.

You can optionally specify how many times in a second should the elapsed
time update by specifying the `fps` value.

## Reference

```typescript
type TFps = number | Ref<number>;

useRaf(
    fps?: TFps,
    runOnMount?: boolean
): {
    isRunning: Ref<boolean>;
    elapsed: Ref<number>;
    start: () => void;
    stop: () => void;
}
```

### Parameters

- `fps: number | Ref<number>` the amount of times per second that the elapsed time should update.
  Please note that when a value greater or equal to `60` is defined, the `fps` logic will be skipped completely
  therefore the elapsed time will update at full speed. By default the value is set to `60` so it will indeed
  update at full speed
- `runOnMount: boolean` whether to run the Raf loop on mount, `true` by default.
  If `false`, you'll have to start the Raf with the `start` function

### Returns

- `isRunning: Ref<boolean>` the Raf status
  - `false` when the Raf loop is paused
  - `true` when the Raf loop is running
- `elapsed: Ref<number>` the total elapsed time excluding paused intervals
- `start: Function` the function used for starting the Raf loop
- `stop: Function` the function used for stopping the Raf loop

## Usage

```html
<template>
  <div>
    <div>Elapsed time: {{ elapsed }}</div>
    <div><button @click="start">Start loop</button></div>
    <div><button @click="stop">Stop loop</button></div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { useRaf } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseRafDemo',
    setup() {
      const fps = 60
      const { elapsed, start, stop } = useRaf(animHandler, fps)
      return {
        elapsed
        start,
        stop
      }
    }
  })
</script>
```
