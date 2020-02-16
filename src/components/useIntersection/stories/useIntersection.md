# useIntersection

Vue function that tracks the changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.

It is based on the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

## Reference

```typescript
useIntersection(
    elRef: Ref<null | Element>,
    options?: IntersectionObserverInit,
    runOnMount?: boolean
): {
    observedEntry: Ref<IntersectionObserverEntry | null>;
    start: () => void;
    stop: () => void;
};
```

### Parameters

- `elRef: Ref<null | Element>` the element to observe
- `options: IntersectionObserverInit` the [IntersectionObserver options](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver#Properties)
- `runOnMount: boolean` whether to observe the element on mount, `true` by default

### Returns

- `observedEntry: Ref<IntersectionObserverEntry | null>` the [observed entry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)
- `start: Function` the function used for starting observing
- `stop: Function` the function used for stopping observing

## Usage

```html
<template>
  <div>
    <div class="el-wrap">
      <div ref="el1Ref" :class="el1Class" class="el"></div>
    </div>
    <div class="el-wrap">
      <div ref="el2Ref" :class="el2Class" class="el"></div>
    </div>
    <div class="el-wrap">
      <div ref="el3Ref" :class="el3Class" class="el"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { ref, watch } from '@src/api'
  import { useIntersection } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseIntersectionDemo',
    setup() {
      const options = {
        root: null,
        rootMargin: '0px 0px -30px',
        threshold: 1.0
      }

      const watchClass = (className, observedEntry, isEnabled) => {
        if (!isEnabled) return
        const isVisible = observedEntry.value.intersectionRatio === 1
        className.value = isVisible ? '-is-visible' : ''
      }

      const el1Ref = ref(null)
      const el1Class = ref('')
      const { observedEntry: el1Ob } = useIntersection(el1Ref, options)
      watch(() => watchClass(el1Class, el1Ob, el1Ob.value))

      const el2Ref = ref(null)
      const el2Class = ref('')
      const { observedEntry: el2Ob } = useIntersection(el2Ref, options)
      watch(() => watchClass(el2Class, el2Ob, el2Ob.value))

      const el3Ref = ref(null)
      const el3Class = ref('')
      const { observedEntry: el3Ob } = useIntersection(el3Ref, options)
      watch(() => watchClass(el3Class, el3Ob, el3Ob.value))

      return {
        el1Ref,
        el1Class,
        el2Ref,
        el2Class,
        el3Ref,
        el3Class
      }
    }
  })
</script>

<style>
  .el-wrap {
    margin: 500px 0;
  }

  .el {
    width: 40px;
    height: 40px;
    background: red;
    transition: 0.3s ease-in-out;
  }

  .el.-is-visible {
    background: green;
  }
</style>
```
