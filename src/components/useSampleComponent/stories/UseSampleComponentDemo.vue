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
        <td>Sample</td>
        <td>
          <span>{{ sample }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
// import { useSampleComponent } from '../../../vue-use-kit'

export default Vue.extend({
  name: 'UseSampleComponentDemo',
  setup() {
    return { sample: 'sample' }
  }
})
</script>
