# useLocalStorage

Vue function that provides way to read, update and delete a localStorage key

## Reference

```typescript
interface UseLocalStorageOptions {
  isParsing: boolean
  serializer?: SerializerFunction
  deserializer?: DeserializerFunction
}
```

```typescript
function useLocalStorage(
  key: string,
  options?: UseLocalStorageOptions,
  runOnMount?: boolean
): {
  item: Ref<any>
  getItem: () => void
  setItem: (newVal: any) => void
  removeItem: () => void
}
```

### Parameters

- `key: string` the localstorage key you wish to get/set/remove
- `options: UseLocalStorageOptions`
  - `isParsing: boolean` whether to enable parsing the localstorage key value or not, `false` by default
  - `serializer: SerializerFunction` a custom serializer, `JSON.stringify` by default
  - `deserializer: DeserializerFunction` a custom deserializer, `JSON.parse` by default
- `runOnMount: boolean` whether to get the localstorage key on mount or not, `true` by default

### Returns

- `item: Ref<any>` the localstorage key value, it can be null, a string or a JSON object/array
- `getItem: Function` get the localstorage key value
- `setItem: Function` set the localstorage key value
  - `newVal: any`: the value to set, can be a string or an object/array
- `removeItem: Function` delete the localstorage key

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
  import { useLocalStorage } from 'vue-use-kit'

  export default Vue.extend({
    name: 'UseLocalStorageDemo',
    setup() {
      const { item, getItem, setItem, removeItem } = useLocalStorage(
        'i_love_local_storage'
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
