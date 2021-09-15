import axios from 'axios'
import router from '../../helpers/router.js'

const state = {
  user: {
    message: {
      _id: null,
      likedPosts: []
    }
  },
  selectedUser: null,
  errors: null,
  authenticated: null
}
const getters = {
  isAuthenticated: state => state.authenticated,
  StateUser: state => state.user,
  SelectedUser: state => state.selectedUser,
  errors: state => state.errors
}
const actions = {
  LogIn ({ commit }, form) {
    commit('loadingTrue')
    axios.post('users/login', form)
      .then(res => {
        commit('setUser', res.data)
        commit('setAuthenticated')
        localStorage.setItem('token', res.data.token)
        console.log(res)
        commit('setErrors', null)
        router.back()
        axios.defaults.headers.common.authorization = localStorage.getItem('token')
        axios.defaults.headers.common.isadmin = res.data.message.isAdmin
        commit('loadingFalse')
      })
      .catch(err => {
        commit('setErrors', err.response.data.message)
        console.log(err.response.data)
        commit('loadingFalse')
      })
  },

  LogOut ({ commit }) {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common.authorization
    delete axios.defaults.headers.common.isadmin
    commit('clearUser')
    commit('setAuthenticated')
  },

  getUser ({ commit }, id) {
    commit('loadingTrue')
    axios.get('/users/' + id)
      .then(res => {
        console.log(res)
        commit('setSelectedUser', res.data)
        if (id === this.getters.StateUser.message._id) {
          router.push('/my-profile')
        } else {
          router.push('/profile/' + id)
        }
        commit('loadingFalse')
      })
      .catch(err => {
        commit('loadingFalse')
        console.log(err)
      })
  }
}
const mutations = {
  setUser (state, res) {
    state.user = res
  },
  clearUser (state) {
    state.user = {
      message: {
        _id: null,
        likedPosts: []
      }
    }
  },
  setErrors (state, err) {
    state.errors = err
  },
  setSelectedUser (state, res) {
    state.selectedUser = res
  },
  clearSelectedUser (state) {
    state.selectedUser = null
  },
  setAuthenticated (state) {
    state.authenticated = !state.authenticated
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
