# useSessionStorage

Vue function that provides way to read, update and delete a sessionStorage key

## Reference

```typescript
interface StorageOptions {
  isParsing: boolean
  serializer?: SerializerFunction
  deserializer?: DeserializerFunction
}
```

```typescript
function useSessionStorage(
  key: string,
  options?: StorageOptions,
  runOnMount?: boolean
): {
  item: Ref<any>
  getItem: () => void
  setItem: (newVal: any) => void
  removeItem: () => void
}
```

### Parameters

- `key: string` the sessionStorage key you wish to get/set/remove
- `options: StorageOptions`
  - `isParsing: boolean` whether to enable parsing the sessionStorage key value or not, `false` by default
  - `serializer: SerializerFunction` a custom serializer, `JSON.stringify` by default
  - `deserializer: DeserializerFunction` a custom deserializer, `JSON.parse` by default
- `runOnMount: boolean` whether to get the sessionStorage key on mount or not, `true` by default

### Returns

- `item: Ref<any>` the sessionStorage key value, it can be null, a string or a JSON object/array
- `getItem: Function` get the sessionStorage key value
- `setItem: Function` set the sessionStorage key value
  - `newVal: any`: the value to set, can be a string or an object/array
- `removeItem: Function` delete the sessionStorage key

## Usage

```html
<template>
  <div>
    <div>Item: {{ item }}</div>
    <button @click="getItem">Get item</button>
    <button @click="setItem('Value here')">Set item</button>
    <button @click="removeItem">Remove item</button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { useSessionStorage } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseSessionStorageDemo',
    setup() {
      const { item, getItem, setItem, removeItem } = useSessionStorage(
        'i_love_session_storage'
      )

      return {
        item,
        getItem,
        setItem,
        removeItem
      }
    }
  })
</script>
```
