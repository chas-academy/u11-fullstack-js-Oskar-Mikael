import axios from 'axios'

const state = {
  user: null
}
const getters = {
  isAuthenticated: state => !!state.user,
  StateUser: state => state.user
}
const actions = {
  async LogIn ({ commit }, form) {
    const response = await axios.post('users/login', form)
    commit('setUser', response.data)
    localStorage.setItem('token', response.data.token)
    console.log(response)
  },

  LogOut ({ commit }) {
    localStorage.removeItem('token')
    commit('clearUser')
  }
}
const mutations = {
  setUser (state, username) {
    state.user = username
  },
  clearUser (state) {
    state.user = null
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
