import Cookie from 'cookie'

export const Cookies = () => {
  const state: any = {
    set(name = '', value = '', opts = { path: '/' }) {
      value = typeof value === 'object' ? JSON.stringify(value) : value
      document.cookie = Cookie.serialize(name, value, opts)
    },

    get(name = '') {
      const cookies = Cookie.parse(document.cookie)
      const cookie = cookies[name]
      return cookie
    },

    remove(name = '', opts = { path: '/', expires: new Date(0) }) {
      const cookie = state.get(name)
      opts.expires = new Date(0)
      if (typeof cookie !== 'undefined') state.set(name, '', opts)
    }
  }

  return state
}
