# useFullscreen

Vue function used for displaying an element in fullscreen mode.

## Reference

```typescript
function useFullscreen(
    elRef: Ref<null | HTMLElement>
): {
    isFullscreen: Ref<boolean>;
    start: () => void;
    stop: () => void;
}
```

### Parameters

- `elRef: Ref<null | HTMLElement>` the element to display fullscreen

### Returns

- `isFullscreen: Ref<boolean>` it is `true` when the element is fullscreen, `false` otherwise
- `start: Function` the function used for starting the fullscreen mode
- `stop: Function` the function used for stopping the fullscreen mode

## Usage

```html
<template>
  <div ref="divRef">
    <p>isFullscreen: {{ isFullscreen }}</p>
    <button @click="start" v-if="!isFullscreen">Launch fullscreen</button>
    <button @click="stop" v-else>Stop fullscreen</button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { ref } from '@src/api'
  import { useFullscreen } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseFullscreenDemo',
    setup() {
      const divRef = ref(null)
      const { isFullscreen, start, stop } = useFullscreen(divRef)
      return { isFullscreen, start, stop, divRef }
    }
  })
</script>
```
