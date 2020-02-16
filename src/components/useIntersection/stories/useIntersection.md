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

First we have to define the intersection component, named `UseIntersectionElDemo.vue`.

```html
<template>
  <div ref="elRef" class="el" :class="elClass">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { ref, watch } from '@src/api'
  import { useIntersection } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseIntersectionElDemo',
    setup() {
      const options = {
        root: null,
        rootMargin: '0px 0px -30px',
        threshold: 1.0
      }

      const elRef = ref(null)
      const elClass = ref('')
      const { observedEntry } = useIntersection(elRef, options)
      watch(() => {
        if (!observedEntry.value) return
        const isVisible = observedEntry.value.intersectionRatio === 1
        elClass.value = isVisible ? '-is-visible' : ''
      })

      return {
        elRef,
        elClass
      }
    }
  })
</script>
```

Then we can call it in a loop in the parent component `UseIntersectionDemo.vue`.

```html
<template>
  <div>
    <div class="el-wrap" v-for="n in tot">
      <use-intersection-el-demo />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import UseIntersectionElDemo from './UseIntersectionElDemo.vue'

  export default Vue.extend({
    name: 'UseIntersectionDemo',
    components: { UseIntersectionElDemo },
    setup() {
      const tot = new Array(100)
      return { tot }
    }
  })
</script>

<style>
  .el-wrap {
    margin: 200px 0;
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
