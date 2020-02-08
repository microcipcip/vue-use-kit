<template>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>Props</th>
        <th>Description</th>
        <th>ValueX</th>
        <th>ValueY</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>docX, docY</td>
        <td>Mouse position <strong>relative to document</strong></td>
        <td>
          <span>{{ toInt(docX) }}px</span>
        </td>
        <td>
          <span>{{ toInt(docY) }}px</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref } from '../../../api'
import { useMouse } from '../../../vue-use-kit'

const toInt = (n: number) => Math.round(n)

export default Vue.extend({
  name: 'UseMouseDemo',
  setup() {
    const { docX, docY } = useMouse()

    return {
      toInt,
      docX,
      docY
    }
  }
})
</script>
