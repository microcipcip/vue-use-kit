# useMouse

Vue function that tracks the mouse `x` and `y` position in the document.

## Reference

```typescript
useMouse(): {
    docX: Ref<number>
    docY: Ref<number>
}
```

### Returns

- `docX: number` the mouse `x` position relative to the document
- `docY: number` the mouse `y` position relative to the document

## Usage

```html
<template>
  <div>docX docY: {{ docX }}px {{ docY }}px</div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { useMouse } from 'vue-use-kit'

  export default Vue.extend({
    name: 'useMouse',
    setup() {
      const { docX, docY } = useMouse()
      return { docX, docY }
    }
  })
</script>
```
