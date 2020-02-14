<template>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>Query</th>
        <th>Result</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>getQuery(0, 300)</td>
        <td>
          <span>{{ mobileQuery }}</span>
        </td>
      </tr>
      <tr>
        <td>getQuery(300, 1024)</td>
        <td>
          <span>{{ tabletQuery }}</span>
        </td>
      </tr>
      <tr>
        <td>getQuery(1024)</td>
        <td>
          <span>{{ desktopQuery }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import { getQuery } from '@src/vue-use-kit'

export default Vue.extend({
  name: 'GetQuery',
  setup() {
    const mobileQuery = getQuery(0, 300)
    const tabletQuery = getQuery(300, 1024)
    const desktopQuery = getQuery(1024)
    return { mobileQuery, tabletQuery, desktopQuery }
  }
})
</script>
