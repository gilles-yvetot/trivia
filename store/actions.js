import { setCookie, deleteCookie } from '../util/cookies'

export default () => ({

  setUser(state, user, token) {
    if (typeof (document) == 'object' && token !== undefined) {
      if (token) {
        setCookie('token', token, 14, 'localhost')
      }
      else {
        deleteCookie('token', 'localhost')
      }
    }
    return ({ user })
  },

  setMessage(state, message, red = false) {
    if (message) {
      return ({ message, isAlert: red })
    }
    else {
      return ({ message, isAlert: false })
    }
  }
})
