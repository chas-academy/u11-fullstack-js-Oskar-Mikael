import axios from 'axios'
import router from '../../helpers/router.js'

const state = {
  user: null,
  selectedUser: null,
  errors: null
}
const getters = {
  isAuthenticated: state => !!state.user,
  StateUser: state => state.user,
  SelectedUser: state => state.selectedUser,
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
        axios.defaults.headers.common.authorization = localStorage.getItem('token')
      })
      .catch(err => {
        commit('setErrors', err.response.data.message)
        console.log(err.response.data)
      })
  },

  LogOut ({ commit }) {
    localStorage.removeItem('token')
    axios.defaults.headers.common.authorization = ''
    commit('clearUser')
  },

  getUser ({ commit }, id) {
    axios.get('/users/' + id)
      .then(res => {
        console.log(res)
        commit('setSelectedUser', res.data)
        router.push('/profile/' + id)
      })
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
  },
  setSelectedUser (state, res) {
    state.selectedUser = res
  },
  clearSelectedUser (state) {
    state.selectedUser = null
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
