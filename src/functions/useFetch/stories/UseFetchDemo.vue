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
      <button
        class="button is-danger"
        @click="stop"
        :disabled="!isLoading"
        v-text="`Abort fetch`"
      />
    </div>

    <!--  isAborted  -->
    <use-fetch-demo-table status="Aborted" v-if="isAborted">
      Resource fetch aborted with status code
      <strong>{{ status }}</strong> and message
      <strong>{{ statusText }}</strong>
    </use-fetch-demo-table>

    <!--  isFailed  -->
    <use-fetch-demo-table status="Failed" v-else-if="isFailed">
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
      <use-fetch-demo-table status="Success" v-else>
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
    const slowApi = 'http://slowwly.robertomurray.co.uk/delay/1000/url'
    const randomDogUrl = `${slowApi}/https://dog.ceo/api/breeds/image/random`
    const url = ref(randomDogUrl)
    const {
      data,
      status,
      statusText,
      isLoading,
      isFailed,
      isAborted,
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
      url.value = `${slowApi}/https://dog.ceo`
      start()
    }

    return {
      data,
      status,
      statusText,
      isInit,
      isLoading,
      isFailed,
      isAborted,
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
