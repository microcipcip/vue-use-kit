# useMediaDevices

Vue function that tracks connected hardware devices.

## Reference

```typescript
interface UseMediaDevicesState {
  deviceId: string
  groupId: string
  kind: string
  label: string
}

function useMediaDevices(
  runOnMount?: boolean
): {
  devicesState: Ref<UseMediaDevicesState[]>
  isTracking: Ref<boolean>
  isTracked: Ref<boolean>
  start: () => void
  stop: () => void
}
```

### Parameters

- `runOnMount: boolean` whether to run the connected media devices tracking on mount, `true` by default

### Returns

- `devicesState: Ref<UseMediaDevicesState[]>` the list of connected media devices
- `isTracking: Ref<boolean>` whether this function events are running or not
- `isTracked: Ref<boolean>` whether the connected devices have been successfully tracked
- `start: Function` the function used to start tracking the connected media devices
- `stop: Function` the function used to stop tracking the connected media devices

## Usage

```html
<template>
  <div>
    <div>
      devicesState:
      <pre>{{ JSON.stringify(devicesState, null, 2) }}</pre>
    </div>
    <div>
      isTracked: {{ isTracked }}
    </div>
    <div>
      <button @click="start" v-if="!isTracking">
        Start tracking media devices
      </button>
      <button @click="stop" v-else>Stop tracking media devices</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { useMediaDevices } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseMediaDevicesDemo',
    setup() {
      const { devicesState, isTracked, start, stop } = useMediaDevices(false)
      return { devicesState, isTracked, start, stop }
    }
  })
</script>
```
