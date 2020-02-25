<template>
  <div class="use-hover" ref="useHoverRef">
    <div>
      <div class="use-hover__emoji" v-if="!isHovered">😴</div>
      <div class="use-hover__emoji" v-else>😃</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref } from '@src/api'
import { useHover } from '@src/vue-use-kit'

export default Vue.extend({
  name: 'UseHoverDemo',
  setup() {
    const useHoverRef = ref(null)
    const isHovered = useHover(useHoverRef)
    return { isHovered, useHoverRef }
  }
})
</script>

<style scoped>
.use-hover {
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  background: #b2b594;
}

.use-hover__emoji {
  font-size: 90px;
}
</style>
