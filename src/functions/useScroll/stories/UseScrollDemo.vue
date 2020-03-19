<template>
  <div>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>isScrolling</td>
          <td>{{ isScrolling }}</td>
        </tr>
        <tr>
          <td>x, y</td>
          <td>{{ x }}px - {{ y }}px</td>
        </tr>
        <tr>
          <td colspan="2">
            <button class="button is-primary" @click="start" v-if="!isTracking">
              Enable scroll tracking
            </button>
            <button class="button is-danger" @click="stop" v-else>
              Disable scroll tracking
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="scrollme" ref="scrollRef">
      <span class="scrollme__msg">Scroll me!</span>
      <div class="scrollme__height"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { useScroll } from '@src/vue-use-kit'
import { ref } from '@src/api'

export default Vue.extend({
  name: 'UseScrollDemo',
  setup() {
    const scrollRef = ref(null)
    const { x, y, isScrolling, isTracking, start, stop } = useScroll(scrollRef)
    return { scrollRef, x, y, isScrolling, isTracking, start, stop }
  }
})
</script>

<style scoped>
.scrollme {
  position: relative;
  overflow-y: scroll;
  height: 200px;
  background: #f1f1f1;
}

.scrollme__msg {
  padding: 10px;
}

.scrollme__height {
  width: 2000px;
  height: 40000px;
}
</style>
