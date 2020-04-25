# useFetch

Vue function that fetch resources asynchronously across the network.

## Reference

```typescript
type TUseFetchUrl = RequestInfo | Ref<RequestInfo>
```

```typescript
function useFetch(
  url: TUseFetchUrl,
  options?: RequestInit,
  runOnMount?: boolean
): {
  data: Ref<any>
  status: Ref<number | null>
  statusText: Ref<string | null>
  isLoading: Ref<boolean>
  isFailed: Ref<boolean>
  isAborted: Ref<boolean>
  start: () => Promise<void>
  stop: () => void
}
```

### Parameters

- `url: TUseFetchUrl` the fetch url value, can be type string or type `RequestInfo`.
- `options: RequestInit` the fetch url options.
- `runOnMount: boolean` whether to fetch on mount, `true` by default.

### Returns

- `data: Ref<any>` the response data, has to be of JSON type otherwise will return an error
- `status: Ref<number | null>` the status code of the response
- `statusText: Ref<string | null>` the status text of the response
- `isLoading: Ref<boolean>` whether fetch request is loading or not
- `isFailed: Ref<boolean>` whether fetch request has failed or not
- `isAborted: Ref<boolean>` whether fetch request has been aborted or not
- `start: Function` the function used for starting fetch request
- `stop: Function` the function used for aborting fetch request

## Usage

```html
<template>
  <div>
    <div v-if="isFailed">Failed!</div>
    <div v-else-if="isLoading">Loading...</div>
    <div v-else><img :src="data.message" alt="" /></div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { useFetch } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseFetchDemo',
    setup() {
      const url = 'https://dog.ceo/api/breeds/image/random'
      const { data, isLoading, isFailed } = useFetch(url)
      return { data, isLoading, isFailed }
    }
  })
</script>
```
