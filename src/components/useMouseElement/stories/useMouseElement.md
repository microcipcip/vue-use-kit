# useMouseElement

Vue function that tracks the mouse `x` and `y` position,
and optionally tracks the mouse position relative to a given element.

## Reference

```typescript
useMouseElement(element: Ref<null | Element>): {
    docX: Ref<number>;
    docY: Ref<number>;
    elX: Ref<number>;
    elY: Ref<number>;
    el: Ref<{
        x: number;
        y: number;
        w: number;
        h: number;
    }>;
}
```

### Parameters

- `element: Ref<null | Element>` used for getting the `x` and `y` mouse position relative to the position of the given element

### Returns

- `docX: number` the mouse `x` position relative to the document
- `docY: number` the mouse `y` position relative to the document
- `elX: number` the mouse `x` position relative to the given element
- `elY: number` the mouse `y` position relative to the given element
- `el.x: number` the element `x` position
- `el.y: number` the element `y` position
- `el.w: number` the element `width` value
- `el.h: number` the element `height` value

## Usage

```html
<template>
  <div>docX docY: {{ docX }}px {{ docY }}px</div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { useMouseElement } from 'vue-use-kit'

  export default Vue.extend({
    name: 'useMouseElement',
    setup() {
      const { docX, docY } = useMouseElement()
      return { docX, docY }
    }
  })
</script>
```
