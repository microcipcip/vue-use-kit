<template>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>Prop</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>item</td>
        <td>{{ item }}</td>
      </tr>
      <tr>
        <td colspan="2">
          <button class="button is-primary" @click="handleSetItem">
            Set / Update item
          </button>
          <button class="button is-danger" @click="removeItem()">
            Remove item
          </button>
        </td>
      </tr>
      <tr>
        <td>jsonItem</td>
        <td>{{ jsonItem }}</td>
      </tr>
      <tr>
        <td colspan="2">
          <button class="button is-primary" @click="handleSetJsonItem">
            Set / Update JSON item
          </button>
          <button class="button is-danger" @click="jsonRemoveItem()">
            Remove JSON item
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import { useSessionStorage } from '@src/vue-use-kit'

export default Vue.extend({
  name: 'useSessionStorageDemo',
  setup() {
    const { item, setItem, removeItem } = useSessionStorage('normalItem')

    const {
      item: jsonItem,
      setItem: jsonSetItem,
      removeItem: jsonRemoveItem
    } = useSessionStorage('jsonItem', {
      isParsing: true
    })

    let counter = 0
    const handleSetItem = () => {
      counter++
      setItem(`count${counter}`)
    }

    const handleSetJsonItem = () => {
      counter++
      jsonSetItem({
        counter: counter,
        counterTest: `test${counter}`
      })
    }

    return {
      item,
      handleSetItem,
      removeItem,
      jsonItem,
      handleSetJsonItem,
      jsonRemoveItem,
      counter
    }
  }
})
</script>
