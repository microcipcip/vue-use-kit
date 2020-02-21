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
        <td>searchParams</td>
        <td>
          <pre>{{ searchParams }}</pre>
          <br />
          <field label="Search param">
            <input class="input" type="text" v-model="searchFld" />
          </field>
          <field label="Filter param">
            <input class="input" type="text" v-model="filterFld" />
          </field>
          <button class="button is-info" @click="clearFields">Clear</button>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <button class="button is-primary" @click="start" v-if="!isTracking">
            Start tracking search param
          </button>
          <button class="button is-danger" @click="stop" v-else>
            Stop tracking search param
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref, watch } from '@vue/composition-api'
import { useSearchParams } from '@src/vue-use-kit'
import Field from './Field.vue'

const updateSearchParams = (
  url: string,
  idVal: string | null,
  searchVal: string
) => history.pushState({}, '', `${url}?id=${idVal}${searchVal}`)

export default Vue.extend({
  name: 'UseSearchParamsDemo',
  components: { Field },
  setup() {
    const { searchParams, isTracking, start, stop } = useSearchParams([
      'id',
      'search',
      'filter'
    ])

    const searchFld = ref('')
    const filterFld = ref('')
    // Update location bar params
    watch([searchFld, filterFld], ([searchVal, filterVal]) => {
      const url = `${location.origin}${location.pathname}`
      const idVal = new URLSearchParams(location.search).get('id')
      const fieldParams =
        searchVal || filterVal ? `&search=${searchVal}&filter=${filterVal}` : ''
      updateSearchParams(url, idVal, fieldParams)
    })

    const clearFields = () => {
      searchFld.value = ''
      filterFld.value = ''
    }

    return {
      searchParams,
      isTracking,
      start,
      stop,
      searchFld,
      filterFld,
      clearFields
    }
  }
})
</script>
