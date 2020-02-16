<template>
  <div>
    <div>
      <span ref="emojiRef" class="emoji" :style="emojiStyle">🐭</span>
      <span class="emoji" :style="emojiTokenStyle">🐭</span>
    </div>
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref, computed, onMounted, onUnmounted } from '@src/api'
import { useMouse } from '@src/vue-use-kit'

const toInt = (n: number) => Math.round(n)

export default Vue.extend({
  name: 'useMouseAdvancedDemo',
  setup() {
    const emojiRef = ref(null)
    let pauseEmoji = ref(true)

    const { docX, docY } = useMouse()

    const emojiStyle = computed(() => {
      if (pauseEmoji.value) return
      return {
        position: 'fixed',
        top: `${docY.value}px`,
        left: `${docX.value}px`
      }
    })

    const emojiTokenStyle = computed(() => {
      if (pauseEmoji.value) return { opacity: 0 }
      return { opacity: 0.2 }
    })

    const toggleEmojiMovement = () => {
      pauseEmoji.value = !pauseEmoji.value
    }

    onMounted(() => {
      document.addEventListener('click', toggleEmojiMovement)
    })

    onUnmounted(() => {
      document.removeEventListener('click', toggleEmojiMovement)
    })

    return {
      emojiRef,
      emojiStyle,
      emojiTokenStyle,
      toggleEmojiMovement,
      toInt,
      docX,
      docY
    }
  }
})
</script>

<style scoped>
.emoji {
  font-size: 40px;
}
</style>
