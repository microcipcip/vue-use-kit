<template>
  <div>
    <div class="actions">
      <button
        class="button is-primary"
        @click="startWithSuccess"
        :disabled="isLoading"
        v-text="isInit ? 'Fetch again!' : 'Fetch'"
      />
      <button
        class="button is-info"
        @click="startWithFailed"
        :disabled="isLoading"
        v-text="`Fetch with failure`"
      />
    </div>

    <!--  isFailed  -->
    <use-fetch-demo-table status="Failed" v-if="isFailed">
      Resource fetch failed with status code
      <strong>{{ status }}</strong> and message
      <strong>{{ statusText }}</strong>
    </use-fetch-demo-table>

    <!--  isSuccess  -->
    <div v-else>
      <!--  !isInit  -->
      <use-fetch-demo-table status="Not initialized" v-if="!isInit">
        Click "Fetch" to initialize the request.
      </use-fetch-demo-table>

      <!--  isLoading  -->
      <use-fetch-demo-table status="Loading" v-else-if="isLoading">
        Resource is being fetched...
      </use-fetch-demo-table>

      <!--  Fetched  -->
      <use-fetch-demo-table status="Success" v-else-if="data">
        <p>
          Resource fetched successfully with status code
          <strong>{{ status }}</strong> and message
          <strong>{{ statusText }}</strong>
        </p>
        <img class="img" :src="data.message" alt="" />
      </use-fetch-demo-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref } from '@src/api'
import { useFetch } from '@src/vue-use-kit'
import UseFetchDemoTable from './UseFetchDemoTable.vue'

export default Vue.extend({
  name: 'UseFetchDemo',
  components: { UseFetchDemoTable },
  setup() {
    const isInit = ref(false)
    const randomDogUrl = 'https://dog.ceo/api/breeds/image/random'
    const url = ref(randomDogUrl)
    const {
      data,
      status,
      statusText,
      isLoading,
      isFailed,
      start,
      stop
    } = useFetch(url, {}, false)

    const startWithSuccess = () => {
      isInit.value = true
      url.value = randomDogUrl
      start()
    }

    const startWithFailed = () => {
      isInit.value = true
      url.value = 'https://dog.ceo'
      start()
    }

    return {
      data,
      status,
      statusText,
      isInit,
      isLoading,
      isFailed,
      startWithSuccess,
      startWithFailed,
      stop
    }
  }
})
</script>

<style scoped>
.actions {
  padding-bottom: 20px;
}

.img {
  display: block;
  margin: 20px 0 0;
  max-width: 300px;
  border-radius: 3px;
}
</style>
