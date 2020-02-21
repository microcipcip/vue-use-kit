# useIdle

Vue function that tracks whether user is being inactive.

## Reference

```typescript
function useIdle(
    ms?: number,
    events?: string[],
    runOnMount?: boolean
): {
    isIdle: Ref<boolean>;
    isTracking: Ref<boolean>;
    start: () => void;
    stop: () => void;
}
```

### Parameters

- `ms: number` milliseconds to wait before deciding whether the user is being idle
- `events: string[]` list of events to track the user for
- `runOnMount: boolean` whether to start tracking idle state on mount, `true` by default

### Returns

- `isIdle: Ref<boolean>` it is `true` when the user is idle, `false` otherwise
- `isTracking: Ref<boolean>` whether the function is tracking the user idle state or not
- `start: Function` the function used for start tracking the user's idle state
- `stop: Function` the function used for stop tracking the user's idle state

## Usage

```html
<template>
  <div>
    <p>isIdle: {{ isIdle }}</p>
    <button @click="start" v-if="!isTracking">Start tracking</button>
    <button @click="stop" v-else>Stop tracking</button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { useIdle } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseIdleDemo',
    setup() {
      const { isIdle, isTracking, start, stop } = useIdle(2500)
      return { isIdle, isTracking, start, stop }
    }
  })
</script>
```
