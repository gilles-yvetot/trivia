import { setCookie, deleteCookie } from '../util/cookies'
import { callTrivia } from '../util/apiCaller'

export default store => ({

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
  },

  setCategory(state, category) {
    store.setState({
      category
    })
    if (category) {
      callTrivia(1, category.data)
        .then(({ results: [question] }) => {
          store.setState({ question })
        })
        .catch(err => {
          store.setMessage({ message: err.message, isAlert: true })
        })
    }
  },



})
