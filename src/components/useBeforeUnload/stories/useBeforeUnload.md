# useBeforeUnload

Vue function that shows browser alert when user try to reload or close the page.

## Reference

```typescript
function useBeforeUnload(
  isPageDirty: Ref<boolean>,
  runOnMount?: boolean
): {
  isTracking: Ref<boolean>
  start: () => void
  stop: () => void
}
```

### Parameters

- `isPageDirty: Ref<boolean>` when this value is `true` value, it will show the browser alert on page change
- `runOnMount: boolean` whether to listen to the 'beforeunload' event on mount, `true` by default

### Returns

- `isTracking: Ref<boolean>` whether this function events are running or not
- `start: Function` the function used to start tracking page change or reload
- `stop: Function` the function used to stop tracking page change or reload

## Usage

```html
<template>
  <div>
    <div>
      <a href="https://google.com">Change page</a>
    </div>
    <div>
      <button @click="start" v-if="!isTracking">
        Start tracking page change or reload
      </button>
      <button @click="stop" v-else>Stop tracking page change or reload</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { ref, watch } from '@src/api'
  import { useBeforeUnload } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseBeforeUnloadDemo',
    setup() {
      const isPageDirty = ref(true)
      const { isTracking, start, stop } = useBeforeUnload(isPageDirty)
      return { isTracking, start, stop, isPageDirty }
    }
  })
</script>
```
