# useOrientation

Vue function that tracks state of device's screen orientation.

## Reference

```typescript
interface UseOrientationState {
    angle: number;
    type: string;
}
```

```typescript
function useOrientation(
  initialState?: UseOrientationState, 
  runOnMount?: boolean
): {
    orientation: Ref<{
        angle: number;
        type: string;
    }>;
    isTracking: Ref<boolean>;
    start: () => void;
    stop: () => void;
};
```

### Parameters

- `initialState: UseOrientationState` the initial state to use before the event listener is fired
- `runOnMount: boolean` whether to track orientation on mount, `true` by default

### Returns

- `orientation: Ref<UseOrientationState>` 
  - `angle: number`: the possible values for the window.orientation angle are: -90, 0, 90, 180. 
  - `type: string`: the type can be `landscape-primary` or `portrait-primary`
- `isTracking: Ref<boolean>` whether this function events are running or not
- `start: Function` the function used to start tracking the device's screen orientation
- `stop: Function` the function used to stop tracking the device's screen orientation

## Usage

```html
<template>
  <div>
    <p>
      orientation:
      <pre>{{ JSON.stringify(orientation, null, 2) }}</pre>
    </p>
    <button @click="start" v-if="!isTracking">Start tracking</button>
    <button @click="stop" v-else>Stop tracking</button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { useOrientation } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseOrientationDemo',
    setup() {
      const { orientation, isTracking, start, stop } = useOrientation()
      return { orientation, isTracking, start, stop }
    }
  })
</script>
```
