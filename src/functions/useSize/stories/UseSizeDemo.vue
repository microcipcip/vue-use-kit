<template>
  <div>
    <div class="box-actions">
      <button class="button is-primary" @click="start" v-if="!isTracking">
        Start tracking resize
      </button>
      <button class="button is-danger" @click="stop" v-else>
        Stop tracking resize
      </button>
    </div>
    <div class="box" ref="elRef">
      <div class="box__feedback">
        {{ Math.ceil(width) }}px - {{ Math.ceil(height) }}px
      </div>
      <div class="box__container">
        <div class="box__message">Resize me!</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { useSize } from '@src/vue-use-kit'
import { ref, watch } from '@src/api'

export default Vue.extend({
  name: 'UseSizeDemo',
  setup() {
    const elRef = ref(null)
    const width = ref(0)
    const height = ref(0)
    const { observedEntry, isTracking, start, stop } = useSize(elRef)
    watch(observedEntry, () => {
      if (!observedEntry.value) return
      width.value = observedEntry.value.contentRect.width
      height.value = observedEntry.value.contentRect.height
    })
    return { elRef, width, height, isTracking, start, stop }
  }
})
</script>

<style scoped>
.box-actions {
  margin-bottom: 20px;
}

.box {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  resize: both;
  overflow: auto;
}

.box__feedback {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #666;
  text-transform: uppercase;
  font-size: 12px;
}

.box__container {
  padding: 20px;
}

.box__message {
  text-transform: uppercase;
  font-weight: bold;
}
</style>
