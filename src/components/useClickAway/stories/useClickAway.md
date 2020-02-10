# useClickAway

Vue function that triggers callback when user clicks outside of target area.

## Reference

```typescript
useClickAway(
  element: Ref<null | Element>,
  onClickAway: (e: Event) => void,
  events?: string[]
): void;
```

### Parameters

- `element: string` the element to checked for click away events
- `onClickAway: string` the callback to run when triggering a click away
- `events: string` list of events to listen to, defaults to `['mousedown', 'touchstart']`

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
  import { ref } from '../../../api'
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
