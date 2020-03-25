# useWindowSize

Vue function that tracks `Window` scroll position.

## Reference

```typescript
function useWindowSize(
  runOnMount?: boolean
): {
  width: Ref<number>
  height: Ref<number>
  isTracking: Ref<boolean>
  start: () => void
  stop: () => void
}
```

### Parameters

- `runOnMount: boolean` whether to track the window resize event on mount, `true` by default

### Returns

- `width: Ref<number>` the current window's `width`
- `height: Ref<number>` the current window's `height`
- `isTracking: Ref<boolean>` whether this function observer is running or not
- `start: Function` the function used for start tracking window's resize event
- `stop: Function` the function used for stop tracking window's resize event

## Usage

```html
<template>
  <div>
    <div>
      Window width and height: {{ width }}px {{ height }}px
    </div>
    <button @click="start" v-if="!isTracking">
      Start tracking window resize
    </button>
    <button @click="stop" v-else>Stop tracking window resize</button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { useWindowSize } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseWindowSizeDemo',
    setup() {
      const { width, height, isTracking, start, stop } = useWindowSize()
      return { width, height, isTracking, start, stop }
    }
  })
</script>
```
