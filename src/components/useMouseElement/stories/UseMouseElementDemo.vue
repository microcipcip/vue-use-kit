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
          <td>Mouse position relative to <strong>document</strong></td>
          <td>{{ toInt(docX) }}px</td>
          <td>{{ toInt(docY) }}px</td>
        </tr>
        <tr>
          <td>elX, elY</td>
          <td>Mouse position <strong>relative to emoji element</strong></td>
          <td>{{ toInt(elX) }}px</td>
          <td>{{ toInt(elY) }}px</td>
        </tr>
        <tr>
          <td>elInfoX, elInfoY</td>
          <td>
            Emoji element position <strong>relative to the document</strong>
          </td>
          <td>{{ toInt(elInfoX) }}px</td>
          <td>{{ toInt(elInfoY) }}px</td>
        </tr>
        <tr>
          <td>elInfoW, elInfoH</td>
          <td>
            Emoji element width and height
          </td>
          <td>{{ toInt(elInfoW) }}px</td>
          <td>{{ toInt(elInfoH) }}px</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref, computed, onMounted, onUnmounted } from '@src/api'
import { useMouseElement } from '@src/vue-use-kit'

const toInt = (n: number) => Math.round(n)

export default Vue.extend({
  name: 'useMouseElementDemo',
  setup() {
    const emojiRef = ref(null)
    let pauseEmoji = ref(true)

    const {
      docX,
      docY,
      elX,
      elY,
      elInfoX,
      elInfoY,
      elInfoW,
      elInfoH
    } = useMouseElement(emojiRef)

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
      docY,
      elX,
      elY,
      elInfoX,
      elInfoY,
      elInfoW,
      elInfoH
    }
  }
})
</script>

<style scoped>
.emoji {
  font-size: 40px;
}
</style>
