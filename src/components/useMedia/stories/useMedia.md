# useMedia

Vue function that tracks the state of a CSS media query.

## Reference

```typescript
const isQueryMatching = useMedia(query: string, defaultState?: boolean): import("@vue/composition-api").Ref<boolean>
```

## Parameters

- `query: string` the media query to use, for example '(min-width: 1024px)'
- `defaultState?: boolean` the value used as fallback for SSR

## Returns

- `isQueryMatching: boolean` whether the query matches or not

## Usage

```html
<template>
  <div>isDesktop: {{ isDesktop ? 'Yes' : 'No' }}</div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { useMedia } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseMedia',
    setup() {
      const query = '(min-width: 1024px)'
      const isDesktop = useMedia(query)
      return { isDesktop }
    }
  })
</script>
```
