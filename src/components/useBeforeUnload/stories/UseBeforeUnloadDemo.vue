<template>
  <div class="form">
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" v-model="nameFld" />
      </div>
    </div>

    <div class="field">
      <p>
        <a class="button is-primary" href="https://google.com">
          <span>Change page</span>
          <span class="icon is-small">
            <i class="fas fa-external-link-alt"></i>
          </span>
        </a>
      </p>
    </div>

    <div class="field">
      <button class="button is-primary" @click="start" v-if="!isTracking">
        Start checking beforeUnload event
      </button>
      <button class="button is-danger" @click="stop" v-else>
        Stop checking beforeUnload event
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref, watch } from '@src/api'
import { useBeforeUnload } from '@src/vue-use-kit'

export default Vue.extend({
  name: 'UseBeforeUnloadDemo',
  setup() {
    const isPageDirty = ref(false)
    const nameFld = ref('')

    watch(nameFld, newVal => {
      isPageDirty.value = !!newVal
    })

    const { isTracking, start, stop } = useBeforeUnload(isPageDirty)
    return { isTracking, start, stop, isPageDirty, nameFld }
  }
})
</script>
