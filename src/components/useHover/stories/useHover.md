# useHover

Vue function that tracks mouse hover state of a given element.

## Reference

```typescript
useHover(element: Ref<null | Element>): Ref<boolean>
```

### Parameters

- `element: Ref<null | Element>` the element used for tracking the mouse hover state

### Returns

- `isHovered: boolean` whether the element is currently hovered or not

## Usage

```html
<template>
  <div ref="useHoverRef">
    <div v-if="!isHovered">😴</div>
    <div v-else>😃</div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { ref } from '../../../api'
  import { useHover } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseHoverDemo',
    setup() {
      const useHoverRef = ref(null)
      const isHovered = useHover(useHoverRef)
      return { isHovered, useHoverRef }
    }
  })
</script>
```
