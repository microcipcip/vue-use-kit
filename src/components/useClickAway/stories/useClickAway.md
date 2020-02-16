# useClickAway

Vue function that triggers a callback when the user clicks outside of the target area.

## Reference

```typescript
useClickAway(
  elRef: Ref<null | Element>,
  callback: (e: Event) => void,
  events?: string[]
): void;
```

### Parameters

- `elRef: Ref<null | Element>` the element to check for click away events
- `callback: Function` the callback to run when triggering a click away
- `events: string[]` list of events to listen to, defaults to `['mousedown', 'touchstart']`

## Usage

```html
<template>
  <div ref="targetRef">
    <span>Target area</span>
    <div v-if="isDropdownOpen">Dropdown nav</div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { ref } from '@src/api'
  import { useClickAway } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseClickAwayDemo',
    setup() {
      const targetRef = ref(null)
      const isDropdownOpen = ref(true)
      const clickAwayHandler = () => {
        isDropdownOpen.value = false
      }
      useClickAway(targetRef, clickAwayHandler)

      return { targetRef, isDropdownOpen }
    }
  })
</script>
```
