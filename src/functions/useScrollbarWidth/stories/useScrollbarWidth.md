# useScrollbarWidth

Vue function that gets current browser's scrollbar width.

## Reference

```typescript
function useScrollbarWidth(
  runOnMount?: boolean
): {
  scrollbarWidth: Ref<number>
  getScrollbarWidth: () => void
}
```

### Parameters

- `runOnMount: boolean` whether to get scrollbar width on mount, `true` by default

### Returns

- `scrollbarWidth: Ref<number>` the scrollbar width
- `getScrollbarWidth: Function` the function to call to get the scrollbar width

## Usage

```html
<template>
  <div>
    scrollbarWidth: {{ scrollbarWidth }}px
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { useScrollbarWidth } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseScrollbarWidthDemo',
    setup() {
      const { scrollbarWidth } = useScrollbarWidth()
      return { scrollbarWidth }
    }
  })
</script>
```
