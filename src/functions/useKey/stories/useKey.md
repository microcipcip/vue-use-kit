# useKey

Vue function that executes a handler when a keyboard key is pressed.

## Reference

```typescript
// function useKey()
```

### Parameters

- `value: string` lorem ipsa

### Returns

- `value: Ref<string>` lorem ipsa

## Usage

Example where se use the `callback` and when pressing the key without
releasing **it will update the value continuously**.

```html
<template>
  <div>
    <p>isPressed {{ isPressed }}</p>
    <p>keyPressCount {{ keyPressCount }}</p>
    <div>
      <button @click="start" v-if="!isTracking">
        Start tracking key press
      </button>
      <button @click="stop" v-else>
        Stop tracking key press
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { ref } from '@src/api'
  import { useKey } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseKeyDemo',
    setup() {
      const keyPressCount = ref(0)

      // Increase value continuously when 'a' key is kept pressed
      const handleKey = () => keyPressCount.value++

      const { isPressed, isTracking, start, stop } = useKey('a', handleKey)
      return { keyPressCount, isPressed, isTracking, start, stop }
    }
  })
</script>
```

Example where se use the `callback` and when pressing the key
**it will update the value only on keyUp**.

```html
<template>
  <div>
    <p>isPressed {{ isPressed }}</p>
    <p>keyPressCount {{ keyPressCount }}</p>
    <div>
      <button @click="start" v-if="!isTracking">
        Start tracking key press
      </button>
      <button @click="stop" v-else>
        Stop tracking key press
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { ref } from '@src/api'
  import { useKey } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseKeyDemo',
    setup() {
      const keyPressCount = ref(0)

      // Increase value when 'a' key is released
      const handleKey = e => {
        if (e.type === 'keyup') keyPressCount.value++
      }

      const { isPressed, isTracking, start, stop } = useKey('a', handleKey)
      return { keyPressCount, isPressed, isTracking, start, stop }
    }
  })
</script>
```

Example where we `watch` the `isPressed` value and when pressing
the key without releasing **it will update the value only once**.

```html
<template>
  <div>
    <p>isPressed {{ isPressed }}</p>
    <p>keyPressCount {{ keyPressCount }}</p>
    <div>
      <button @click="start" v-if="!isTracking">
        Start tracking key press
      </button>
      <button @click="stop" v-else>
        Stop tracking key press
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { watch, ref } from '@src/api'
  import { useKey } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseKeyDemo',
    setup() {
      const keyPressCount = ref(0)
      const { isPressed, isTracking, start, stop } = useKey('a')

      // Increase value when 'a' key is pressed
      watch(isPressed, isPress => isPress && keyPressCount.value++)

      return { keyPressCount, isPressed, isTracking, start, stop }
    }
  })
</script>
```
