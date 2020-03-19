# useScroll

Vue function that tracks an HTML element's scroll position.

## Reference

```typescript
function useScroll(
  elRef: Ref<null | HTMLElement | Window>,
  ms?: number,
  runOnMount?: boolean
): {
  x: Ref<number>
  y: Ref<number>
  isTracking: Ref<boolean>
  isScrolling: Ref<boolean>
  start: () => void
  stop: () => void
}
```

### Parameters

- `elRef: Ref<null | HTMLElement | Window>` target element used for tracking the `x` and `y` scroll position
- `ms: number` how many milliseconds of delay before `isScrolling` goes back to false (basically when user is idle), `150` by default
- `runOnMount: boolean` whether to run the scroll tracking on mount, `true` by default

### Returns

- `x: Ref<number>` the `x` scroll position relative to the elRef
- `y: Ref<number>` the `y` scroll position relative to the elRef
- `isScrolling: Ref<boolean>` whether the element is currently being scrolled or not
- `isTracking: Ref<boolean>` whether this function events are running or not
- `start: Function` the function used for starting the scroll tracking
- `stop: Function` the function used for stopping the scroll tracking

## Usage

```html
<template>
  <div>
    <div>x, y: {{ x }}px - {{ y }}px</div>
    <div>isScrolling: {{ isScrolling }}</div>
    <button @click="start" v-if="!isTracking">Start tracking</button>
    <button @click="stop" v-else>Stop tracking</button>
    <div ref="scrollRef" class="scrollme">
      <div class="scrollme__height"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { useScroll } from 'vue-use-kit'
  import { ref } from '@src/api'

  export default Vue.extend({
    name: 'useScrollDemo',
    setup() {
      const scrollRef = ref(null)
      const { x, y, isScrolling, isTracking, start, stop } = useScroll(scrollRef)
      return { scrollRef, x, y, isScrolling, isTracking, start, stop }
    }
  })
</script>

<style scoped>
  .scrollme {
    position: relative;
    overflow-y: scroll;
    height: 200px;
    background: #f1f1f1;
  }

  .scrollme__height {
    width: 2000px;
    height: 40000px;
  }
</style>
```
