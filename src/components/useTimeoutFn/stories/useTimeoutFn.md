# useTimeoutFn

Vue function that calls given callback function after specified amount of milliseconds.

## Reference

```typescript
useTimeoutFn(
    callback: Function,
    ms?: number
): {
    isReady: Ref<boolean | null>;
    cancelTimer: () => void;
    resetTimer: () => void;
}
```

### Parameters

- `value: string` lorem ipsa

### Returns

- `value: string` lorem ipsa

## Usage

```html
<template>
  <div>
    <p>Timeout status: {{ isReady ? 'Called!' : 'Pending...' }}</p>
    <p>Timeout Callback msg: {{ timerFnMsg }}</p>

    <button @click="resetTimer">Reset Timer</button>
    <button @click="cancelTimer">Cancel Timer</button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { ref } from '../../../api'
  import { useTimeoutFn } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseTimeoutFnDemo',
    setup() {
      const timerFnMsg = ref('Timer not completed')
      const { isReady, cancelTimer, resetTimer } = useTimeoutFn(() => {
        timerFnMsg.value = 'Timer completed!'
      }, 3000)

      return { timerFnMsg, isReady, cancelTimer, resetTimer }
    }
  })
</script>
```
