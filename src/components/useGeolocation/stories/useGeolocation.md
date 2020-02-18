# useGeolocation

Vue function that tracks geolocation state of user's device, based on the [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API).

## Reference

```typescript
interface UseGeolocation {
  loading: boolean
  accuracy: number | null
  altitude: number | null
  altitudeAccuracy: number | null
  heading: number | null
  latitude: number | null
  longitude: number | null
  speed: number | null
  timestamp: number | null
  error?: Error | PositionError
}
```

```typescript
function useGeolocation(
    options?: PositionOptions,
    runOnMount?: boolean
): {
    isTracking: Ref<boolean>;
    geo: Ref<UseGeolocation>;
    start: () => void;
    stop: () => void;
}
```

### Parameters

- `options: PositionOptions` the [geolocation position options](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions)
- `runOnMount: boolean` whether to run the geolocation tracking on mount, `true` by default

### Returns

- `geo: Ref<UseGeolocation>` the geolocation object
- `isTracking: Ref<boolean>` whether the function is tracking the user's location or not
- `start: Function` the function used for starting the geolocation tracking
- `stop: Function` the function used for stopping the geolocation tracking

## Usage

```html
<template>
  <div>
    <div>
      Geo:
      <pre>{{ JSON.stringify(geo, null, 2) }}</pre>
    </div>
    <button @click="start" v-if="!isTracking">
      Enable geolocation tracking
    </button>
    <button @click="stop" v-else>Disable geolocation tracking</button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { useGeolocation } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseGeolocationDemo',
    setup() {
      const { isTracking, geo, start, stop } = useGeolocation()
      return { isTracking, geo, start, stop }
    }
  })
</script>
```
