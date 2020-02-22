# useMouseLeavePage

Vue function that tracks when mouse leaves page boundaries.

## Reference

```typescript
function useMouseLeavePage(
  runOnMount?: boolean
): {
  hasLeftPage: Ref<boolean>
  isTracking: Ref<boolean>
  start: () => void
  stop: () => void
}
```

### Parameters

- `runOnMount: boolean` whether to check mouse leaves page boundaries tracking on mount, `true` by default

### Returns

- `hasLeftPage: Ref<boolean>` whether the mouse has left the page or not
- `isTracking: Ref<boolean>` whether this function events are running or not
- `start: Function` the function used to start tracking when the mouse leaves the page boundaries
- `stop: Function` the function used to stop tracking when the mouse leaves the page boundaries

## Usage

```html
<template>
  <div>
    <div>
      hasLeftPage:
      <pre>{{ hasLeftPage }}</pre>
    </div>
    <div>
      <button @click="start" v-if="!isTracking">
        Start tracking mouse leave event
      </button>
      <button @click="stop" v-else>Stop tracking mouse leave event</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { useMouseLeavePage } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseMouseLeavePageDemo',
    setup() {
      const { hasLeftPage, isTracking, start, stop } = useMouseLeavePage()
      return { hasLeftPage, isTracking, start, stop }
    }
  })
</script>
```
