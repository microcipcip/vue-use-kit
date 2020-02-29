# useLocation

Vue function that tracks bar navigation location state.

## Reference

```typescript
interface UseLocationState {
  trigger: string
  state: any
  length: number
  hash: string
  host: string
  hostname: string
  href: string
  origin: string
  pathname: string
  port: string
  protocol: string
  search: string
}
```

```typescript
function useLocation(
  runOnMount?: boolean
): {
  locationState: Ref<UseLocationState>
  isTracking: Ref<boolean>
  start: () => void
  stop: () => void
}
```

### Parameters

- `runOnMount: boolean` whether to start tracking the bar navigation location state on mount, `true` by default

### Returns

- `locationState: Ref<object>` the location object
- `isTracking: Ref<UseLocationState>` whether the location state is being currently tracked or not
- `start: Function` the function used for starting the location tracking
- `stop: Function` the function used for stopping the location tracking

## Usage

```html
<template>
  <div>
    <div>
      locationState:
      <pre>{{ JSON.stringify(locationState, null, 2) }}</pre>
    </div>
    <div>
      <button @click="push">Fire push event</button>
      <button @click="replace">Fire replace event</button>
    </div>
    <div>
      <button @click="start" v-if="!isTracking">Start tracking location</button>
      <button @click="stop" v-else>Stop tracking location</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { useLocation } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseLocationDemo',
    setup() {
      let count = 0
      const url = location.origin + location.pathname + location.search
      const push = () => {
        count++
        history.pushState({ page: count }, '', `${url}&page=${count}`)
      }
      const replace = () => {
        count--
        history.replaceState({ page: count }, '', `${url}&page=${count}`)
      }
      const { locationState, isTracking, start, stop } = useLocation()
      return { locationState, isTracking, start, stop, push, replace }
    }
  })
</script>
```
