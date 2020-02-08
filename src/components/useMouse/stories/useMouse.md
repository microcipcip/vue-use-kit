# useMouse

Vue function that tracks the mouse `x` and `y` position, 
and optionally tracks the mouse position relative to a given element.

## Reference

```typescript
function useMouse(
  el?: Ref<null | Element>
): {
  docX: Ref<number>
  docY: Ref<number>
  elX: Ref<number>
  elY: Ref<number>
}
```

## Parameters

- `el?: Ref<null | Element>` used for getting the `x` and `y` mouse position relative to the position of the given element 

## Returns

- `docX: number` the mouse `x` position relative to the document
- `docY: number` the mouse `y` position relative to the document
- `elX: number` the mouse `x` position relative to the given element
- `elY: number` the mouse `y` position relative to the given element

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
