# useSearchParams

Vue function that tracks browser's location search parameters.

## Reference

```typescript
function useSearchParams(
  parameters: string[],
  runOnMount?: boolean
): {
  searchParams: Ref<object>
  isTracking: Ref<boolean>
  start: () => void
  stop: () => void
}
```

### Parameters

- `parameters: string[]` the list of parameters you wish to track
- `runOnMount: boolean` whether to run the location search parameters tracking on mount, `true` by default

### Returns

- `searchParams: Ref<object>` the object containing the search parameters as key value pairs
- `isTracking: Ref<boolean>` whether this function events are running or not
- `start: Function` the function used to start tracking the location search parameters
- `stop: Function` the function used to stop tracking the location search parameters

## Usage

```html
<template>
  <div>
    <div>
      searchParams:
      <pre>{{ JSON.stringify(searchParams, null, 2) }}</pre>
    </div>
    <div>
      <button @click="push">Fire push event</button>
    </div>
    <div>
      <button @click="start" v-if="!isTracking">Start tracking location</button>
      <button @click="stop" v-else>Stop tracking location</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { useSearchParams } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseSearchParamsDemo',
    setup() {
      let count = 0
      const url = location.origin + location.pathname
      const push = () => {
        count++
        history.pushState('', '', `${url}?page=${count}`)
      }
      const { searchParams, isTracking, start, stop } = useSearchParams([
        'page'
      ])
      return { searchParams, isTracking, start, stop, push }
    }
  })
</script>
```
