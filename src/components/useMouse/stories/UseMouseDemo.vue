<template>
  <table class="table is-fullwidth" ref="tableRef">
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
        <td>Mouse position relative to <strong>document</strong></td>
        <td>
          <span>{{ toInt(docX) }}px</span>
        </td>
        <td>
          <span>{{ toInt(docY) }}px</span>
        </td>
      </tr>
      <tr>
        <td>elX, elY</td>
        <td>Mouse position relative to <strong>table element</strong></td>
        <td>
          <span>{{ toInt(elX) }}px</span>
        </td>
        <td>
          <span>{{ toInt(elY) }}px</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref } from '@vue/composition-api'
import { useMouse } from '../../../vue-use-kit'

const toInt = (n: number) => Math.round(n)

export default Vue.extend({
  name: 'UseMouseDemo',
  setup() {
    const tableRef = ref(null)
    const { docX, docY, elX, elY } = useMouse(tableRef)

    return {
      tableRef,
      toInt,
      docX,
      docY,
      elX,
      elY,
    }
  }
})
</script>
