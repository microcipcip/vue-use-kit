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
        <td>scrollbarWidth</td>
        <td>{{ scrollbarWidth }}px</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import { useScrollbarWidth } from '@src/vue-use-kit'

export default Vue.extend({
  name: 'UseScrollbarWidthDemo',
  setup() {
    const { scrollbarWidth } = useScrollbarWidth()
    return { scrollbarWidth }
  }
})
</script>
