# useSize

Vue function that tracks the size of an HTML element.

This function is based on the [ResizeObserver API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

Please note that **ResizeObserver does not work on certain browsers such as IE/Edge/Safari**,
therefore you should add a polyfill such as:

```js
import { ResizeObserver } from '@juggle/resize-observer'
window.ResizeObserver = window.ResizeObserver || ResizeObserver
```

## Reference

```typescript
function useSize(
  elRef: Ref<null | HTMLElement>,
  options?: ResizeObserverObserveOptions,
  runOnMount?: boolean
): {
  observedEntry: Ref<ResizeObserverEntry | null>
  isTracking: Ref<boolean>
  start: () => void
  stop: () => void
}
```

### Parameters

- `elRef: Ref<null | HTMLElement>` the element to observe for size changes
- `options: ResizeObserverObserveOptions` the [ResizeObserver options](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/observe)
- `runOnMount: boolean` whether to observe the element on mount, `true` by default

### Returns

- `observedEntry: Ref<ResizeObserverEntry | null>` the [observed entry](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry)
- `isTracking: Ref<boolean>` whether this function observer is running or not
- `start: Function` the function used for start observing
- `stop: Function` the function used for stop observing

## Usage

```html
<template>
  <div class="box" ref="elRef">
    <div class="box__msg">Resize me!</div>
    <div class="box__info">{{ width }} {{ height }}</div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { useSize } from 'vue-use-kit'
  import { ref, watch } from '@src/api'

  export default Vue.extend({
    name: 'UseSizeDemo',
    setup() {
      const elRef = ref(null)
      const width = ref(0)
      const height = ref(0)
      const { observedEntry } = useSize(elRef)

      watch(observedEntry, () => {
        if (!observedEntry.value) return
        width.value = observedEntry.value.contentRect.width
        height.value = observedEntry.value.contentRect.height
      })

      return { elRef, width, height }
    }
  })
</script>

<style scoped>
  .box {
    resize: both;
    overflow: auto;
  }
</style>
```
