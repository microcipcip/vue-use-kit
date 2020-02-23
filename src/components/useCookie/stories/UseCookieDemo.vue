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
        <td>cookie</td>
        <td>{{ cookie }}</td>
      </tr>
      <tr>
        <td colspan="2">
          <button
            class="button is-primary"
            @click="counter++ && updateCookie(`count${counter}`)"
          >
            Update cookie
          </button>
          <button class="button is-danger" @click="deleteCookie()">
            Delete cookie
          </button>
        </td>
      </tr>
      <tr>
        <td>jsonCookie</td>
        <td>{{ jsonCookie }}</td>
      </tr>
      <tr>
        <td colspan="2">
          <button
            class="button is-primary"
            @click="
              counter++ &&
                jsonUpdateCookie({
                  counter: counter,
                  counterTest: `test${counter}`
                })
            "
          >
            Update json cookie
          </button>
          <button class="button is-danger" @click="jsonDeleteCookie()">
            Delete json cookie
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref } from '@vue/composition-api'
import { useCookie } from '@src/vue-use-kit'

export default Vue.extend({
  name: 'UseCookieDemo',
  setup() {
    const counter = ref(0)

    const { cookie, updateCookie, deleteCookie } = useCookie('normalCookie')

    const {
      cookie: jsonCookie,
      updateCookie: jsonUpdateCookie,
      deleteCookie: jsonDeleteCookie
    } = useCookie('jsonCookie')

    return {
      cookie,
      updateCookie,
      deleteCookie,
      jsonCookie,
      jsonUpdateCookie,
      jsonDeleteCookie,
      counter
    }
  }
})
</script>
