<template>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>Status</th>
        <th>Message</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td v-text="status" />
        <td width="100%"><slot></slot></td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'UseFetchDemoTable',
  props: {
    status: String
  }
})
</script>

<style scoped></style>
