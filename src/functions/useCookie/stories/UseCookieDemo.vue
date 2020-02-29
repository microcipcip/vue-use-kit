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
          <button class="button is-primary" @click="handleSetCookie">
            Set / Update cookie
          </button>
          <button class="button is-danger" @click="removeCookie()">
            Remove cookie
          </button>
        </td>
      </tr>
      <tr>
        <td>jsonCookie</td>
        <td>{{ jsonCookie }}</td>
      </tr>
      <tr>
        <td colspan="2">
          <button class="button is-primary" @click="handleSetJsonCookie">
            Set / Update JSON cookie
          </button>
          <button class="button is-danger" @click="jsonRemoveCookie()">
            Remove JSON cookie
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import { useCookie } from '@src/vue-use-kit'

export default Vue.extend({
  name: 'UseCookieDemo',
  setup() {
    const { cookie, setCookie, removeCookie } = useCookie('normalCookie')

    const {
      cookie: jsonCookie,
      setCookie: jsonSetCookie,
      removeCookie: jsonRemoveCookie
    } = useCookie('jsonCookie', {
      isParsing: true
    })

    let counter = 0
    const handleSetCookie = () => {
      counter++
      setCookie(`count${counter}`)
    }

    const handleSetJsonCookie = () => {
      counter++
      jsonSetCookie({
        counter: counter,
        counterTest: `test${counter}`
      })
    }

    return {
      cookie,
      handleSetCookie,
      removeCookie,
      jsonCookie,
      handleSetJsonCookie,
      jsonRemoveCookie,
      counter
    }
  }
})
</script>
