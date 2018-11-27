import { setCookie, deleteCookie } from '../util/cookies'
import { callTrivia, callApi } from '../util/apiCaller'

export default store => ({

  addAnswerToUser(state, answer) {
    callApi('user/result', 'post', {
      question: state.question.question,
      user_answer: answer,
      correct_answer: state.question.correct_answer,
      incorrect_answers: state.question.incorrect_answers,
    })
      .then(user => {
        store.setState({ user, token:state.token })
      })
      .catch(err => {
        store.setState({ message: err.message, isAlert: true })
      })
  },

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
      category,
      question: null,
    })
    if (category) {
      callTrivia(1, category.data, state.difficulty)
        .then(({ results: [question] }) => {
          store.setState({ question })
        })
        .catch(err => {
          store.setState({ message: err.message, isAlert: true })
        })
    }
  },

  setDifficulty(state, difficulty) {
    return { difficulty }
  },

})
