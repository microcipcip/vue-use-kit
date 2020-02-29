<template>
  <div
    ref="divRef"
    class="fullscreen-wrap"
    :class="{ '-is-active': isFullscreen }"
  >
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>isFullscreen</td>
          <td>{{ isFullscreen }}</td>
        </tr>
        <tr>
          <td colspan="2">
            <button
              class="button is-primary"
              @click="start"
              v-if="!isFullscreen"
            >
              Launch fullscreen
            </button>
            <button class="button is-danger" @click="stop" v-else>
              Stop fullscreen
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref } from '@src/api'
import { useFullscreen } from '@src/vue-use-kit'

export default Vue.extend({
  name: 'UseFullscreenDemo',
  setup() {
    const divRef = ref(null)
    const { isFullscreen, start, stop } = useFullscreen(divRef)
    return { isFullscreen, start, stop, divRef }
  }
})
</script>

<style scoped>
.fullscreen-wrap.-is-active {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f1f1f1;
}

.fullscreen-wrap.-is-active table {
  max-width: 500px;
}
</style>
