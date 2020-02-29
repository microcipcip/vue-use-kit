<template>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>Query</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>isDesktop</td>
        <td :class="getMediaClass(isDesktop)">{{ isDesktop }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import { useMedia } from '@src/vue-use-kit'

const getMediaClass = (val: string) => (val ? 'query-valid' : 'query-invalid')

export default Vue.extend({
  name: 'UseMedia',
  setup() {
    const query = '(min-width: 1024px)'
    const isDesktop = useMedia(query)
    return { isDesktop, getMediaClass }
  }
})
</script>

<style scoped>
.query-valid {
  color: #fff;
  background: #209817;
}

.query-invalid {
  color: #fff;
  background: #981105;
}
</style>
