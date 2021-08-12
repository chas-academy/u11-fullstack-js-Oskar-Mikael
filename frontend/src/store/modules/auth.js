import axios from 'axios'
import router from '../../helpers/router.js'

const state = {
  user: null,
  errors: null
}
const getters = {
  isAuthenticated: state => !!state.user,
  StateUser: state => state.user,
  errors: state => state.errors
}
const actions = {
  LogIn ({ commit }, form) {
    axios.post('users/login', form)
      .then(res => {
        commit('setUser', res.data)
        localStorage.setItem('token', res.data.token)
        console.log(res)
        commit('setErrors', null)
        router.push('/posts')
      })
      .catch(err => {
        commit('setErrors', err.response.data.message)
        console.log(err.response.data)
      })
  },

  LogOut ({ commit }) {
    localStorage.removeItem('token')
    commit('clearUser')
  }
}
const mutations = {
  setUser (state, res) {
    state.user = res
  },
  clearUser (state) {
    state.user = null
  },
  setErrors (state, err) {
    state.errors = err
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
