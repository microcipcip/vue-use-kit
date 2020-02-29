# useMouseElement

Vue function that tracks the mouse `x` and `y` position,
and optionally tracks the mouse position relative to a given element.

## Reference

```typescript
function useMouseElement(elRef: Ref<null | HTMLElement>): {
    docX: Ref<number>;
    docY: Ref<number>;
    elX: Ref<number>;
    elY: Ref<number>;
    elInfoX: Ref<number>;
    elInfoY: Ref<number>;
    elInfoW: Ref<number>;
    elInfoH: Ref<number>;
}
```

### Parameters

- `elRef: Ref<null | HTMLElement>` used for getting the `x` and `y` mouse position relative to the position of the given element

### Returns

- `docX: Ref<number>` the mouse `x` position relative to the document
- `docY: Ref<number>` the mouse `y` position relative to the document
- `elX: Ref<number>` the mouse `x` position relative to the given element
- `elY: Ref<number>` the mouse `y` position relative to the given element
- `elInfoX: Ref<number>` the element `x` position
- `elInfoY: Ref<number>` the element `y` position
- `elInfoW: Ref<number>` the element `width` value
- `elInfoH: Ref<number>` the element `height` value

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
